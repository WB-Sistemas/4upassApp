package com.mycompany.nativeqrscanner;

import android.Manifest;
import android.content.pm.PackageManager;
import android.graphics.Color;
import android.graphics.drawable.GradientDrawable;
import android.graphics.Rect;
import android.util.Size;
import android.util.TypedValue;
import android.view.Gravity;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.FrameLayout;
import android.widget.ImageButton;
import android.widget.ImageView;
import android.widget.LinearLayout;

import androidx.activity.OnBackPressedCallback;
import androidx.camera.core.Camera;
import androidx.camera.core.CameraSelector;
import androidx.camera.core.ImageAnalysis;
import androidx.camera.core.ImageProxy;
import androidx.camera.core.Preview;
import androidx.camera.lifecycle.ProcessCameraProvider;
import androidx.camera.view.PreviewView;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;

import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

import com.google.common.util.concurrent.ListenableFuture;
import com.google.mlkit.vision.barcode.common.Barcode;
import com.google.mlkit.vision.barcode.BarcodeScanner;
import com.google.mlkit.vision.barcode.BarcodeScanning;
import com.google.mlkit.vision.common.InputImage;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;


@CapacitorPlugin(name = "NativeQrScanner")
public class NativeQrScannerPlugin extends Plugin {

    private PreviewView previewView;
    private FrameLayout scannerContainer;
    private ViewGroup rootView;
    private Camera camera;
    private ProcessCameraProvider cameraProvider;
    private ExecutorService executor = Executors.newSingleThreadExecutor();
    private BarcodeScanner scanner = BarcodeScanning.getClient();
    private PluginCall activeCall;
    private boolean callResolved = false;
    private boolean torchEnabled = false;
    private ImageButton flashButton;
    private OnBackPressedCallback backCallback;

    @PluginMethod
    public void open(PluginCall call) {
        activeCall = call;
        callResolved = false;

        if (ContextCompat.checkSelfPermission(
                getContext(),
                Manifest.permission.CAMERA
        ) != PackageManager.PERMISSION_GRANTED) {

            ActivityCompat.requestPermissions(
                    getActivity(),
                    new String[]{Manifest.permission.CAMERA},
                    1001
            );
        }

        getActivity().runOnUiThread(() -> {
            closeInternal();
            setupScannerView();
            registerBackHandler();
            startCamera(call);
        });
    }

    private void setupScannerView() {
        rootView = (ViewGroup) getActivity().getWindow().getDecorView().findViewById(android.R.id.content);

        scannerContainer = new FrameLayout(getContext());
        scannerContainer.setLayoutParams(new FrameLayout.LayoutParams(
                FrameLayout.LayoutParams.MATCH_PARENT,
                FrameLayout.LayoutParams.MATCH_PARENT
        ));
        scannerContainer.setBackgroundColor(Color.BLACK);

        previewView = new PreviewView(getContext());
        previewView.setLayoutParams(new FrameLayout.LayoutParams(
                FrameLayout.LayoutParams.MATCH_PARENT,
                FrameLayout.LayoutParams.MATCH_PARENT
        ));
        previewView.setScaleType(PreviewView.ScaleType.FILL_CENTER);
        scannerContainer.addView(previewView);

        ScannerOverlayView overlayView = new ScannerOverlayView(getContext());
        scannerContainer.addView(overlayView);

        addControls(scannerContainer);

        if (scannerContainer.getParent() == null) {
            rootView.addView(scannerContainer);
        }

        getBridge().getWebView().setVisibility(View.INVISIBLE);
    }

    private void addControls(FrameLayout container) {
        int margin = dp(14);

        Button bottomClose = new Button(getContext());
        bottomClose.setText("CERRAR");
        bottomClose.setAllCaps(true);
        bottomClose.setTextColor(Color.BLACK);
        bottomClose.setTextSize(TypedValue.COMPLEX_UNIT_SP, 11);
        bottomClose.setPadding(dp(8), 0, dp(8), 0);
        bottomClose.setBackground(createRoundBackground(Color.WHITE, dp(18)));
        bottomClose.setOnClickListener(v -> resolveCancelled());

        int flashResId = getDrawableId("ic_flash");
        if (flashResId == 0) {
            flashResId = android.R.drawable.ic_lock_idle_charging;
        }
        flashButton = createIconButton(flashResId);
        flashButton.setOnClickListener(v -> toggleTorch());
        flashButton.setEnabled(false);
        flashButton.setAlpha(0.35f);
        flashButton.setBackground(createRoundBackground(Color.WHITE, dp(18)));
        flashButton.setColorFilter(Color.BLACK);

        LinearLayout bottomRow = new LinearLayout(getContext());
        bottomRow.setOrientation(LinearLayout.HORIZONTAL);
        bottomRow.setGravity(Gravity.CENTER);

        FrameLayout.LayoutParams bottomParams = new FrameLayout.LayoutParams(
                FrameLayout.LayoutParams.MATCH_PARENT,
                FrameLayout.LayoutParams.WRAP_CONTENT
        );
        bottomParams.gravity = Gravity.BOTTOM;
        bottomParams.setMargins(dp(20), 0, dp(20), dp(60));
        bottomRow.setLayoutParams(bottomParams);

        LinearLayout.LayoutParams closeParams = new LinearLayout.LayoutParams(dp(90), dp(36));
        closeParams.setMargins(0, 0, dp(12), 0);
        bottomClose.setLayoutParams(closeParams);

        LinearLayout.LayoutParams flashParams = new LinearLayout.LayoutParams(dp(44), dp(44));
        flashButton.setLayoutParams(flashParams);

        bottomRow.addView(bottomClose);
        bottomRow.addView(flashButton);
        container.addView(bottomRow);
    }

    private ImageButton createIconButton(int resId) {
        ImageButton button = new ImageButton(getContext());
        int size = dp(44);
        LinearLayout.LayoutParams params = new LinearLayout.LayoutParams(size, size);
        params.setMargins(0, 0, dp(8), 0);
        button.setLayoutParams(params);
        button.setImageResource(resId);
        button.setScaleType(ImageView.ScaleType.CENTER);
        button.setColorFilter(Color.WHITE);
        button.setBackground(createRoundBackground(0x88000000, dp(14)));
        return button;
    }

    private GradientDrawable createRoundBackground(int color, int radius) {
        GradientDrawable drawable = new GradientDrawable();
        drawable.setColor(color);
        drawable.setCornerRadius(radius);
        return drawable;
    }

    private int getDrawableId(String name) {
        return getContext()
                .getResources()
                .getIdentifier(name, "drawable", getContext().getPackageName());
    }

    private boolean isBarcodeInFrame(Barcode barcode, ImageProxy imageProxy) {
        Rect box = barcode.getBoundingBox();
        if (box == null) {
            return false;
        }

        int width = imageProxy.getWidth();
        int height = imageProxy.getHeight();
        int rotation = imageProxy.getImageInfo().getRotationDegrees();
        if (rotation == 90 || rotation == 270) {
            int tmp = width;
            width = height;
            height = tmp;
        }

        float size = Math.min(width, height) * 0.7f;
        float left = (width - size) / 2f;
        float top = (height - size) / 2f;
        float right = left + size;
        float bottom = top + size;

        int cx = box.centerX();
        int cy = box.centerY();
        return cx >= left && cx <= right && cy >= top && cy <= bottom;
    }

    private void startCamera(PluginCall call) {
        ListenableFuture<ProcessCameraProvider> future =
                ProcessCameraProvider.getInstance(getContext());

        future.addListener(() -> {
            try {
                cameraProvider = future.get();

                Preview preview = new Preview.Builder().build();
                preview.setSurfaceProvider(previewView.getSurfaceProvider());

                ImageAnalysis analysis =
                        new ImageAnalysis.Builder()
                                .setTargetResolution(new Size(1280, 720))
                                .setBackpressureStrategy(
                                        ImageAnalysis.STRATEGY_KEEP_ONLY_LATEST
                                )
                                .build();

                analysis.setAnalyzer(executor, imageProxy -> {
                    if (imageProxy.getImage() == null) {
                        imageProxy.close();
                        return;
                    }

                    InputImage image =
                            InputImage.fromMediaImage(
                                    imageProxy.getImage(),
                                    imageProxy.getImageInfo().getRotationDegrees()
                            );

                    scanner.process(image)
                            .addOnSuccessListener(barcodes -> {
                                for (Barcode b : barcodes) {
                                    if (b.getRawValue() != null && isBarcodeInFrame(b, imageProxy)) {
                                        resolveWithValue(b.getRawValue());
                                        break;
                                    }
                                }
                            })
                            .addOnCompleteListener(t -> imageProxy.close());
                });

                cameraProvider.unbindAll();

                camera = cameraProvider.bindToLifecycle(
                        getActivity(),
                        CameraSelector.DEFAULT_BACK_CAMERA,
                        preview,
                        analysis
                );

                updateFlashAvailability();

            } catch (Exception e) {
                call.reject("Camera error", e);
            }
        }, ContextCompat.getMainExecutor(getContext()));
    }

    @PluginMethod
    public void toggleFlash(PluginCall call) {
        boolean enable = call.getBoolean("enable", false);
        if (camera != null && camera.getCameraInfo().hasFlashUnit()) {
            torchEnabled = enable;
            camera.getCameraControl().enableTorch(enable);
            updateFlashButtonState();
        }
        call.resolve();
    }

    @PluginMethod
    public void close(PluginCall call) {
        resolveCancelled();
        call.resolve();
    }

    private void resolveWithValue(String value) {
        if (activeCall == null || callResolved) {
            return;
        }
        JSObject ret = new JSObject();
        ret.put("value", value);
        activeCall.resolve(ret);
        callResolved = true;
        activeCall = null;
        closeInternal();
    }

    private void resolveCancelled() {
        if (activeCall != null && !callResolved) {
            JSObject ret = new JSObject();
            ret.put("cancelled", true);
            activeCall.resolve(ret);
            callResolved = true;
            activeCall = null;
        }
        closeInternal();
    }

    private void closeInternal() {
        getActivity().runOnUiThread(() -> {
            if (cameraProvider != null) {
                cameraProvider.unbindAll();
                cameraProvider = null;
            }
            if (rootView != null && scannerContainer != null) {
                rootView.removeView(scannerContainer);
            }
            if (backCallback != null) {
                backCallback.remove();
                backCallback = null;
            }
            scannerContainer = null;
            previewView = null;
            flashButton = null;
            torchEnabled = false;
            getBridge().getWebView().setVisibility(View.VISIBLE);
        });
    }

    private void registerBackHandler() {
        if (backCallback != null) {
            backCallback.remove();
        }
        backCallback = new OnBackPressedCallback(true) {
            @Override
            public void handleOnBackPressed() {
                resolveCancelled();
            }
        };
        getActivity().getOnBackPressedDispatcher().addCallback(backCallback);
    }

    private void updateFlashAvailability() {
        if (flashButton == null) {
            return;
        }
        boolean hasFlash = camera != null && camera.getCameraInfo().hasFlashUnit();
        flashButton.setEnabled(hasFlash);
        flashButton.setAlpha(hasFlash ? (torchEnabled ? 1f : 0.7f) : 0.35f);
    }

    private void updateFlashButtonState() {
        if (flashButton == null) {
            return;
        }
        flashButton.setAlpha(torchEnabled ? 1f : 0.7f);
    }

    private void toggleTorch() {
        if (camera == null || !camera.getCameraInfo().hasFlashUnit()) {
            return;
        }
        torchEnabled = !torchEnabled;
        camera.getCameraControl().enableTorch(torchEnabled);
        updateFlashButtonState();
    }

    private int dp(int value) {
        return (int) TypedValue.applyDimension(
                TypedValue.COMPLEX_UNIT_DIP,
                value,
                getContext().getResources().getDisplayMetrics()
        );
    }
}
