// import { ConfigStateService, LocalizationService, PagedResultDto, PermissionService } from '';
import { LocalizationService } from '@abp/ng.core';
import { Component, inject, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TipoDocs } from 'src/app/proxy/usuario';
import { EntradaSimpleDto,EntradasService,ReportesService,ReturnDataErrors } from 'src/app/proxy/tickets/entradas';
import { debounceTime, filter } from 'rxjs';
import { QrComponent } from 'src/app/qr/qr.component';
import { CacheEventoService } from 'src/app/shared/cache-evento.service';
import { DateUtils } from 'src/app/utils/date-utils';
import { DeviceUtils } from 'src/app/utils/device-utils';
import { TiposDocList } from 'src/app/utils/doc-identificacion-utils';
import { ControlEntradasService, SeccionOutputDTO } from 'src/app/proxy/tickets/control-entradas';

const cacheKey: string = 'camaraId';
export type EntradaSimplePlus = Omit<EntradaSimpleDto, 'fecha'> & { fecha: Date };

@Component({
  selector: 'app-escanear-qr',
  templateUrl: './escanear-qr.component.html',
  styleUrls: ['./escanear-qr.component.scss'],
})

export class EscanearQrComponent implements OnInit, OnDestroy {
  
 @ViewChild(QrComponent) scanQr!: QrComponent;
  cameras: MediaDeviceInfo[] = [];
  selectedCameraId: string = '';
  camaraActive: boolean = false;
  qrValue: string | null = null;
  eventoId: string = '';
  exitoso: boolean = false;
  mensajeError: string = '';
  // datosEntradaExito?: EntradaSimpleDto;
  datosEntradaError?: ReturnDataErrors;
  solicitudCompleta: boolean = false;
  form: FormGroup;
  modalActive: boolean = false;
  processingValue: boolean = false;
  horaDeScan: Date = new Date();
  modalExpiradoActive: boolean = false;
  fechaExpiracion: Date = new Date();
  camaraHabilitada: boolean = false;
  datosEntradaExito?: EntradaSimplePlus;

  tipoIdentificacionNombre: string = '';
  tipoIdentificacion: { name: string, value: TipoDocs }[] = [];
  isMobile: boolean = false;
  escaneados:number = 0; 
  total:number = 0;  
  seccionSelected: number | null = null;
  seccionesOptions: SeccionOutputDTO[] = [];
  isErrorSeccion: boolean = false;
  errorSeccionSub: string = '';
  datosSeccionError?: ReturnDataErrors;
  
  constructor(
    private ar: ActivatedRoute,
    private entradaService: EntradasService,
    private fb: FormBuilder,
    private cacheLocal: CacheEventoService,
    private router: Router,
    private reportesService: ReportesService,
    private localization: LocalizationService,
    private controlEntradasService: ControlEntradasService
  ) { 
    this.form = this.initForm()
  }

  ngOnInit(): void {
    this.isMobile = DeviceUtils.isMobile();
    this.tipoIdentificacion = TiposDocList(this.localization);
    this.eventoId = this.ar.snapshot.paramMap.get("eventoId") ?? '';

    this.ar.queryParams.subscribe(params => {
      this.seccionSelected = params["seccionSelected"] ? Number(params["seccionSelected"]) : null;
    });

    this.controlEntradasService.getByControlEntradas(this.eventoId).subscribe(res => {
      if(!res || !res.secciones?.length) return;
      this.seccionesOptions = res.secciones;
      if(this.seccionSelected === null && this.seccionesOptions.length === 1){
        this.seccionSelected = this.seccionesOptions[0].num;
      }
      this.loadTotales();
    });
    
    this.idReferencia?.valueChanges
      .pipe(
        debounceTime(600),
        filter((value: string) => value.length === 10)
      ).subscribe((value) => {
        this.procesarValor(value);
      });

    this.loadTotales();
  }
  initForm() {
    return this.fb.group({
      idReferencia: [null]
    });
  }
  ngOnDestroy(): void {
    if (this.camaraActive) {
      this.camaraActive = false;
      this.scanQr.desactivarCamara();
    }
  }
  procesarValor(valor: string) {
    console.warn('procesarValor', valor, this.eventoId);
    this.entradaService.buscarTicketQR(this.eventoId, valor.toUpperCase(), true, this.seccionSelected ?? undefined).subscribe(res => {
      console.log('res escaneo: ',res);
      this.mensajeError = res.mensajeError ?? '';
      this.exitoso = res.exitoso;
      this.modalActive = true;
      this.isErrorSeccion = false;
      this.errorSeccionSub = '';
      this.datosSeccionError = undefined;
      if (this.camaraActive) {
        this.desactivarQr();
      }
      if (res.exitoso) {
        const ent = res.value.entradaSimpleDto;
        this.datosEntradaExito = {... ent, fecha: DateUtils.IsoString(ent.fecha ?? '')};
        this.tipoIdentificacionNombre = this.getTipoIdentificacionNombre(this.datosEntradaExito.tipoIdentificacion);
      }
      else if (this.mensajeError.includes("Entrada expirada")){
        this.modalExpiradoActive = true;
        this.fechaExpiracion = DateUtils.IsoString(res.value.returnDataErrors.expiredDate ?? '');
      }
      else if (this.mensajeError.toLowerCase().includes("secci")) {
        this.isErrorSeccion = true;
        this.errorSeccionSub = res.value.returnDataErrors?.subtitle ?? '';
        this.datosSeccionError = res.value.returnDataErrors;
        this.horaDeScan = DateUtils.IsoString(res.value.returnDataErrors.scanTime ?? '');
      }
      else if(res.value){
        this.datosEntradaError = res.value.returnDataErrors;
        this.horaDeScan = DateUtils.IsoString(res.value.returnDataErrors.scanTime ?? '');
      }
    });
  }

  cerrarModalAdvertencia() {
    this.modalExpiradoActive = false;
  }

  switchQr(): void {
  this.camaraActive = true;
  
  if(this.camaraActive){
    setTimeout(() => {
      this.scanQr.activarCamara();
    }, 100);
  }
  }

  desactivarQr(): void {
    this.camaraActive = false;
    this.scanQr.desactivarCamara();
  }

  activarQr() {
    this.camaraActive = true;
    this.camaraHabilitada = true;
    this.scanQr.activarCamara()
  }

  closeModal() {
    this.modalActive = false;
    this.camaraActive = true;
  
    if(this.camaraActive){
      setTimeout(() => {
        this.scanQr.activarCamara();
      }, 100);
    }
    
    this.datosEntradaError = undefined;
    this.datosEntradaExito = undefined;
    this.mensajeError = '';
    this.exitoso = false;
    this.isErrorSeccion = false;
    this.errorSeccionSub = '';
    this.datosSeccionError = undefined;
    this.modalExpiradoActive = false;
  }

  cerrarModal(){
    this.modalActive = false;
    this.datosEntradaError = undefined;
    this.datosEntradaExito = undefined;
    this.mensajeError = '';
    this.exitoso = false;
    this.isErrorSeccion = false;
    this.errorSeccionSub = '';
    this.datosSeccionError = undefined;
    this.modalExpiradoActive = false;
  }

  confirmScan() {
    this.modalActive = false;
    this.entradaService.buscarTicketQR(this.eventoId, this.datosEntradaExito?.idLegible?.toUpperCase()??'', false, this.seccionSelected ?? undefined).subscribe(res => {
      this.solicitudCompleta = true;
      this.exitoso = res.exitoso;
      this.mensajeError = res.mensajeError ?? '';
      if (res.exitoso) {
        const ent = res.value.entradaSimpleDto;
        this.datosEntradaExito = {... ent, fecha: DateUtils.IsoString(ent.fecha ?? '')};
        this.tipoIdentificacionNombre = this.getTipoIdentificacionNombre(this.datosEntradaExito.tipoIdentificacion);
        this.processingValue = false;
        this.switchQr();

        this.loadTotales();
      } else {
        this.modalActive = true;
        this.datosEntradaError = res.value.returnDataErrors;
        this.horaDeScan = DateUtils.IsoString(res.value.returnDataErrors.scanTime ?? '');
      }
    })
  }

  getTipoIdentificacionNombre(tipoValor: TipoDocs): string {
    const tipo = this.tipoIdentificacion.find(t => t.value === tipoValor);
    return tipo ? tipo.name : 'Desconocido';
  }

  initCameras(codeDevices: MediaDeviceInfo[]) {
    const devices = codeDevices;

    this.cameras = devices.filter(device => device.kind === 'videoinput');
    if (this.cameras.length > 0) {
      this.selectedCameraId = this.cacheLocal.getCache(cacheKey);
      let cam = this.cameras.find(c => c.deviceId === this.selectedCameraId);
      if (!cam) {
        this.selectedCameraId = this.cameras[0].deviceId;
        cam = this.cameras[0];
      }
      this.scanQr.cambiarCamara(cam);
    }
  }

  redirect(){
    let queryParams = { eventoId: this.eventoId, seccionSelected: this.seccionSelected ?? undefined }
    const url = "eventos-asignados/control-manual"
    this.router.navigate([url], {queryParams});

    // this.router.navigate(["account/login"], {queryParams})
  }

  protected switchCamera(device: MediaDeviceInfo) {
    this.selectedCameraId = device.deviceId;
    this.cacheLocal.saveCache(cacheKey, this.selectedCameraId);
    this.scanQr.cambiarCamara(device);
  }

  seccionOnChange(event: any){
    const value = Number(event?.detail?.value ?? event);
    this.seccionSelected = isNaN(value) ? null : value;
    this.router.navigate([], {
      relativeTo: this.ar,
      queryParams: { seccionSelected: this.seccionSelected ?? undefined },
      queryParamsHandling: 'merge',
      replaceUrl: true
    });
    this.loadTotales();
  }

  loadTotales(){
    this.reportesService.getTotalEntradasEscaneadas('', this.eventoId, this.seccionSelected ?? undefined).subscribe(res => {
      this.escaneados = res.escaneadas
      this.total = res.total
    })
  }

  get idReferencia() {
    return this.form.get('idReferencia')
  }
}
