#import <Capacitor/Capacitor.h>

CAP_PLUGIN(NativeQrScannerPlugin, "NativeQrScanner",
           CAP_PLUGIN_METHOD(open, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(close, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(toggleFlash, CAPPluginReturnPromise);
)
