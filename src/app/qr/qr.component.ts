import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { Capacitor } from '@capacitor/core';
import { CapacitorBarcodeScanner, CapacitorBarcodeScannerTypeHint, CapacitorBarcodeScannerCameraDirection,
CapacitorBarcodeScannerScanOrientation, CapacitorBarcodeScannerAndroidScanningLibrary} from '@capacitor/barcode-scanner';
import { IonicModule } from '@ionic/angular';
import { Subject, throttleTime } from 'rxjs';


@Component({
  selector: 'app-qr',
   standalone: true,
  imports: [CommonModule,IonicModule],
  template: ``,
  styleUrls: ['./qr.component.scss'],
})
export class QrComponent implements OnInit, OnDestroy {

  @Input() encendido: boolean = false;
  @Output() valor = new EventEmitter<string>();
  @Output() devices = new EventEmitter<MediaDeviceInfo[]>();

  private data = new Subject<string>();
  protected device: MediaDeviceInfo | undefined = undefined;
  scannedResult: string | null = null;
  private isScanning: boolean = false;

  ngOnInit() {

    this.data.pipe(throttleTime(1000))
    .subscribe((value) => this.valor.emit(value));
      
  }

  ngOnDestroy(): void {
    this.desactivarCamara();
  }
  
  async scanBarcode() {
  
   try {
     const result = await CapacitorBarcodeScanner.scanBarcode({
       hint: CapacitorBarcodeScannerTypeHint.QR_CODE,
       scanInstructions: 'Apunta el QR',
       scanButton: false,
       scanText: '',
       cameraDirection: CapacitorBarcodeScannerCameraDirection.BACK,
       scanOrientation: CapacitorBarcodeScannerScanOrientation.ADAPTIVE,
       android: {
         scanningLibrary: CapacitorBarcodeScannerAndroidScanningLibrary.ZXING
       },
       web: {
         showCameraSelection: true,
         scannerFPS: 60
       }
     });
  
     
    if (result && result.ScanResult) {
      this.scannedResult = result.ScanResult;
      this.valor.emit(result.ScanResult);
    } else {
      this.scannedResult = 'No se detectó ningún código.';
    }
    } catch (error) {
      console.error('Error al escanear:', error);
      this.scannedResult = 'Error durante el escaneo.';
    }
  }

  private async scanWithNativeScanner(): Promise<void> {
    if (this.isScanning) {
      return;
    }
    await BarcodeScanner.prepare();
    const permission = await BarcodeScanner.checkPermission({ force: true });
    if (!permission.granted) {
      this.scannedResult = 'Permiso de cámara denegado.';
      return;
    }

    this.isScanning = true;
    document.body.classList.add('scanner-active');
    await BarcodeScanner.hideBackground();

    try {
      const result = await BarcodeScanner.startScan();
      if (result && result.hasContent) {
        this.scannedResult = result.content;
        this.valor.emit(result.content);
      } else {
        this.scannedResult = 'No se detectó ningún código.';
      }
    } catch (error) {
      console.error('Error al escanear:', error);
      this.scannedResult = 'Error durante el escaneo.';
    } finally {
      await this.stopNativeScanner();
    }
  }

  private async stopNativeScanner(): Promise<void> {
    const wasScanning = this.isScanning;
    this.isScanning = false;
    document.body.classList.remove('scanner-active');
    await BarcodeScanner.showBackground();
    if (!wasScanning) {
      return;
    }
    try {
      await BarcodeScanner.stopScan();
    } catch (error) {
      console.warn('Error al detener el escaneo:', error);
    }
  }

  protected emitDevices(devs: MediaDeviceInfo[]): void {
    this.devices.emit(devs);
  }

  activarCamara(): void {
    this.encendido = true;
    if (!Capacitor.isNativePlatform()) {
      this.scanBarcode();
      return;
    }
    void this.scanWithNativeScanner();
  }

  desactivarCamara() {
    this.encendido = false;
    if (!Capacitor.isNativePlatform()) {
      return;
    }
    void this.stopNativeScanner();
  }

  cambiarCamara(camara: MediaDeviceInfo) {
    if (camara?.deviceId == this.device?.deviceId) return;
    this.device = camara;
  }

  protected scan(value: string) {
    this.data.next(value);
  }

}
