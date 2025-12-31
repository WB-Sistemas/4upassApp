import { registerPlugin } from '@capacitor/core';

export interface NativeQrScannerPlugin {
  open(): Promise<{ value?: string; cancelled?: boolean } | void>;
  close(): Promise<void>;
  toggleFlash(enable: boolean): Promise<void>;
}

const NativeQrScanner = registerPlugin<NativeQrScannerPlugin>('NativeQrScanner');

export default NativeQrScanner;
