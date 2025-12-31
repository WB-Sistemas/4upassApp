import Capacitor
import AVFoundation
import UIKit

@objc(NativeQrScannerPlugin)
public class NativeQrScannerPlugin: CAPPlugin {

    private var scannerVC: NativeQrScannerViewController?
    private var didResolve: Bool = false

    @objc func open(_ call: CAPPluginCall) {
        DispatchQueue.main.async {
            let vc = NativeQrScannerViewController()
            vc.modalPresentationStyle = .fullScreen
            self.didResolve = false

            vc.onResult = { result in
                if self.didResolve { return }
                self.didResolve = true
                call.resolve([
                    "value": result
                ])
            }

            vc.onClose = {
                if self.didResolve { return }
                self.didResolve = true
                call.resolve([
                    "cancelled": true
                ])
            }

            self.bridge?.viewController?.present(vc, animated: true)
            self.scannerVC = vc
        }
    }

    @objc func close(_ call: CAPPluginCall) {
        DispatchQueue.main.async {
            self.scannerVC?.dismiss(animated: true)
            self.scannerVC = nil
            call.resolve()
        }
    }

    @objc func toggleFlash(_ call: CAPPluginCall) {
        scannerVC?.toggleFlash()
        call.resolve()
    }
}
