import UIKit
import AVFoundation

class NativeQrScannerViewController: UIViewController, AVCaptureMetadataOutputObjectsDelegate {

    var onResult: ((String) -> Void)?
    var onClose: (() -> Void)?

    private let captureSession = AVCaptureSession()
    private var previewLayer: AVCaptureVideoPreviewLayer!
    private var metadataOutput: AVCaptureMetadataOutput?
    private var flashOn = false
    private var didFinish = false

    private let overlayView = UIView()
    private let closeButton = UIButton(type: .custom)
    private let flashButton = UIButton(type: .system)
    private let buttonStack = UIStackView()

    private let dimLayer = CAShapeLayer()
    private let cornersLayer = CAShapeLayer()
    private let scanLineLayer = CAShapeLayer()
    private var frameRect = CGRect.zero

    override func viewDidLoad() {
        super.viewDidLoad()
        view.backgroundColor = .black
        setupCamera()
        setupOverlay()
    }

    override func viewDidLayoutSubviews() {
        super.viewDidLayoutSubviews()
        previewLayer?.frame = view.bounds
        updateOverlayFrame()
        updateRectOfInterest()
    }

    override func viewWillDisappear(_ animated: Bool) {
        super.viewWillDisappear(animated)
        captureSession.stopRunning()
        if !didFinish {
            didFinish = true
            onClose?()
        }
    }

    // MARK: - Camera

    private func setupCamera() {
        guard let device = AVCaptureDevice.default(for: .video),
              let input = try? AVCaptureDeviceInput(device: device) else {
            return
        }

        let output = AVCaptureMetadataOutput()
        metadataOutput = output

        if captureSession.canAddInput(input) {
            captureSession.addInput(input)
        }

        if captureSession.canAddOutput(output) {
            captureSession.addOutput(output)
            output.setMetadataObjectsDelegate(self, queue: .main)
            output.metadataObjectTypes = [.qr]
        }

        previewLayer = AVCaptureVideoPreviewLayer(session: captureSession)
        previewLayer.videoGravity = .resizeAspectFill
        previewLayer.frame = view.layer.bounds
        view.layer.insertSublayer(previewLayer, at: 0)

        captureSession.startRunning()
        updateFlashAvailability()
    }

    // MARK: - Overlay

    private func setupOverlay() {
        overlayView.translatesAutoresizingMaskIntoConstraints = false
        overlayView.backgroundColor = .clear
        view.addSubview(overlayView)
        NSLayoutConstraint.activate([
            overlayView.leadingAnchor.constraint(equalTo: view.leadingAnchor),
            overlayView.trailingAnchor.constraint(equalTo: view.trailingAnchor),
            overlayView.topAnchor.constraint(equalTo: view.topAnchor),
            overlayView.bottomAnchor.constraint(equalTo: view.bottomAnchor)
        ])

        closeButton.setTitle("CERRAR", for: .normal)
        closeButton.setTitleColor(.black, for: .normal)
        closeButton.setTitleColor(.black, for: .highlighted)
        closeButton.setTitleColor(.black, for: .disabled)
        closeButton.titleLabel?.font = UIFont.systemFont(ofSize: 11, weight: .semibold)
        closeButton.backgroundColor = .white
        closeButton.layer.backgroundColor = UIColor.white.cgColor
        closeButton.setBackgroundImage(solidImage(color: .white), for: .normal)
        closeButton.setBackgroundImage(solidImage(color: .white), for: .highlighted)
        closeButton.setBackgroundImage(solidImage(color: .white), for: .disabled)
        closeButton.setBackgroundImage(solidImage(color: .white), for: .selected)
        closeButton.layer.cornerRadius = 22
        closeButton.clipsToBounds = true
        closeButton.contentEdgeInsets = UIEdgeInsets(top: 0, left: 8, bottom: 0, right: 8)
        closeButton.addTarget(self, action: #selector(closeTapped), for: .touchUpInside)
        closeButton.widthAnchor.constraint(equalToConstant: 120).isActive = true
        closeButton.heightAnchor.constraint(equalToConstant: 44).isActive = true

        if let image = UIImage(systemName: "bolt.fill") {
            flashButton.setImage(image, for: .normal)
        }
        flashButton.tintColor = .black
        flashButton.backgroundColor = .white
        flashButton.layer.cornerRadius = 24
        flashButton.widthAnchor.constraint(equalToConstant: 48).isActive = true
        flashButton.heightAnchor.constraint(equalToConstant: 48).isActive = true
        flashButton.addTarget(self, action: #selector(toggleFlashAction), for: .touchUpInside)

        buttonStack.translatesAutoresizingMaskIntoConstraints = false
        buttonStack.axis = .horizontal
        buttonStack.spacing = 12
        buttonStack.alignment = .center
        buttonStack.addArrangedSubview(closeButton)
        buttonStack.addArrangedSubview(flashButton)
        view.addSubview(buttonStack)

        NSLayoutConstraint.activate([
            buttonStack.bottomAnchor.constraint(equalTo: view.safeAreaLayoutGuide.bottomAnchor, constant: -96),
            buttonStack.centerXAnchor.constraint(equalTo: view.centerXAnchor)
        ])

        dimLayer.fillRule = .evenOdd
        dimLayer.fillColor = UIColor(white: 0, alpha: 0.55).cgColor
        overlayView.layer.addSublayer(dimLayer)

        cornersLayer.strokeColor = UIColor(red: 0.63, green: 0.88, blue: 0.75, alpha: 1).cgColor
        cornersLayer.lineWidth = 3
        cornersLayer.fillColor = UIColor.clear.cgColor
        overlayView.layer.addSublayer(cornersLayer)

        scanLineLayer.strokeColor = UIColor(red: 0.63, green: 0.88, blue: 0.75, alpha: 1).cgColor
        scanLineLayer.lineWidth = 2
        overlayView.layer.addSublayer(scanLineLayer)
        view.bringSubviewToFront(buttonStack)
    }

    private func updateOverlayFrame() {
        let size = min(view.bounds.width, view.bounds.height) * 0.7
        let left = (view.bounds.width - size) / 2
        let top = (view.bounds.height - size) / 2
        frameRect = CGRect(x: left, y: top, width: size, height: size)

        let fullPath = UIBezierPath(rect: view.bounds)
        let holePath = UIBezierPath(roundedRect: frameRect, cornerRadius: 18)
        fullPath.append(holePath)
        dimLayer.path = fullPath.cgPath

        let corner: CGFloat = 24
        let path = UIBezierPath()
        let r = frameRect
        // top-left
        path.move(to: CGPoint(x: r.minX, y: r.minY + corner))
        path.addLine(to: CGPoint(x: r.minX, y: r.minY))
        path.addLine(to: CGPoint(x: r.minX + corner, y: r.minY))
        // top-right
        path.move(to: CGPoint(x: r.maxX - corner, y: r.minY))
        path.addLine(to: CGPoint(x: r.maxX, y: r.minY))
        path.addLine(to: CGPoint(x: r.maxX, y: r.minY + corner))
        // bottom-left
        path.move(to: CGPoint(x: r.minX, y: r.maxY - corner))
        path.addLine(to: CGPoint(x: r.minX, y: r.maxY))
        path.addLine(to: CGPoint(x: r.minX + corner, y: r.maxY))
        // bottom-right
        path.move(to: CGPoint(x: r.maxX - corner, y: r.maxY))
        path.addLine(to: CGPoint(x: r.maxX, y: r.maxY))
        path.addLine(to: CGPoint(x: r.maxX, y: r.maxY - corner))
        cornersLayer.path = path.cgPath

        let linePadding: CGFloat = 12
        let linePath = UIBezierPath()
        linePath.move(to: CGPoint(x: r.minX + linePadding, y: r.minY + 12))
        linePath.addLine(to: CGPoint(x: r.maxX - linePadding, y: r.minY + 12))
        scanLineLayer.path = linePath.cgPath
        scanLineLayer.frame = view.bounds

        scanLineLayer.removeAllAnimations()
        let anim = CABasicAnimation(keyPath: "transform.translation.y")
        anim.fromValue = 0
        anim.toValue = (r.maxY - r.minY) - 24
        anim.duration = 2.2
        anim.repeatCount = .infinity
        scanLineLayer.add(anim, forKey: "scan")
    }

    private func updateRectOfInterest() {
        guard let output = metadataOutput, let layer = previewLayer else { return }
        let rect = layer.metadataOutputRectConverted(fromLayerRect: frameRect)
        output.rectOfInterest = rect
    }

    private func solidImage(color: UIColor) -> UIImage {
        let renderer = UIGraphicsImageRenderer(size: CGSize(width: 1, height: 1))
        return renderer.image { ctx in
            color.setFill()
            ctx.fill(CGRect(x: 0, y: 0, width: 1, height: 1))
        }
    }

    // MARK: - Actions

    @objc private func closeTapped() {
        didFinish = true
        dismiss(animated: true)
        onClose?()
    }

    @objc private func toggleFlashAction() {
        toggleFlash()
    }

    func toggleFlash() {
        guard let device = AVCaptureDevice.default(for: .video),
              device.hasTorch else { return }

        try? device.lockForConfiguration()
        flashOn.toggle()
        device.torchMode = flashOn ? .on : .off
        device.unlockForConfiguration()
        updateFlashButtonState()
    }

    private func updateFlashAvailability() {
        guard let device = AVCaptureDevice.default(for: .video) else { return }
        let hasTorch = device.hasTorch
        flashButton.isEnabled = hasTorch
        flashButton.alpha = hasTorch ? (flashOn ? 1.0 : 0.7) : 0.35
    }

    private func updateFlashButtonState() {
        flashButton.alpha = flashOn ? 1.0 : 0.7
    }

    func metadataOutput(
        _ output: AVCaptureMetadataOutput,
        didOutput metadataObjects: [AVMetadataObject],
        from connection: AVCaptureConnection
    ) {
        guard !didFinish,
              let obj = metadataObjects.first as? AVMetadataMachineReadableCodeObject,
              let value = obj.stringValue,
              let transformed = previewLayer.transformedMetadataObject(for: obj) as? AVMetadataMachineReadableCodeObject
        else { return }

        let center = CGPoint(x: transformed.bounds.midX, y: transformed.bounds.midY)
        if !frameRect.contains(center) {
            return
        }

        didFinish = true
        captureSession.stopRunning()
        dismiss(animated: true)
        onResult?(value)
    }
}
