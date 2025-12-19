import { LocalizationService } from '@abp/ng.core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TipoDocs } from 'src/app/proxy/usuario';
import { EntradaSimpleDto, EntradasService } from 'src/app/proxy/tickets/entradas';
import { CustomModalService } from 'src/app/services/custom-modal.service';
import { DeviceUtils } from 'src/app/utils/device-utils';
import { TiposDocList } from 'src/app/utils/doc-identificacion-utils';
import { DateUtils } from 'src/app/utils/date-utils';
import { ControlEntradasService, SeccionOutputDTO } from 'src/app/proxy/tickets/control-entradas';
import { NavController, RefresherCustomEvent } from '@ionic/angular';

@Component({
  selector: 'app-control-entradas-manual',
  templateUrl: './control-entradas-manual.component.html',
  styleUrls: ['./control-entradas-manual.component.scss'],
})
export class ControlEntradasManualComponent  implements OnInit {

 scanned: boolean = true;
  entr: EntradaSimpleDto[] = [];
  filter: string = '';
  eventoId: string = '';
  isMobile: boolean = false;
  tipoIdentificacion: { name: string, value: TipoDocs }[] = [];
  seccionSelected: number | null = null;
  seccionesOptions: SeccionOutputDTO[] = [];
  selectAlertOpts = { cssClass: 'select-alert' };
  

  isScanModalOpen  = false; 
  modalMessage = ''; 
  modalType: 'success' | 'error' = 'success';
  modalIcon: string = 'assets/confirm.svg';
  modalTitle: string = '';
  modalSubtitle: string = '';
  modalSectionName: string = '';
  modalExpiryDate: string = '';
  modalExpiryTime: string = '';
  
  constructor(
    private ar: ActivatedRoute,
    private entradaService: EntradasService,
    private customModal: CustomModalService,
    private localization: LocalizationService,
    private navCtrl: NavController,
    private controlEntradasService: ControlEntradasService
  ) {}

  ngOnInit(): void {
    this.isMobile = DeviceUtils.isMobile();
    this.tipoIdentificacion = TiposDocList(this.localization);
    this.ar.queryParams.subscribe(params =>{
      this.eventoId = params["eventoId"];
      this.seccionSelected = params["seccionSelected"] ? Number(params["seccionSelected"]) : null;
      console.log('Evento ID:', this.eventoId);
      this.loadSecciones();
      if (this.filter.trim()) {
        this.search(this.filter);
      }
    });
  }

  handleRefresh(event: RefresherCustomEvent){
      setTimeout(() => {
        this.ngOnInit();
        event.target.complete();
      },2000);
  }

  confirmScan(scanned: boolean, idLegible: string) {
    const mustSelectSection = this.seccionesOptions.length > 0 && (this.seccionSelected === null || this.seccionSelected === undefined);
    if (mustSelectSection) {
      this.showScanMessage(
        '',
        'error',
        {
          title: 'Sección requerida',
          subtitle: 'Seleccione una sección antes de escanear.',
          sectionName: ''
        }
      );
      return;
    }
    if (scanned) return;
    this.entradaService.buscarTicketQR(this.eventoId, idLegible.toUpperCase(), false, this.seccionSelected ?? undefined).subscribe(res => {
      if (res.exitoso) {
        const entradaIndex = this.entr.findIndex(e => e.idLegible === idLegible.toUpperCase());
        if (entradaIndex !== -1) {
          this.entr[entradaIndex].used = true;
        }
        this.showScanMessage("Entrada escaneada correctamente", 'success');
        return;
      }
      const returnErrors: any = res?.value?.returnDataErrors ?? {};
      const requiredSection =
        returnErrors?.sectionName ||
        returnErrors?.nombreSeccion ||
        returnErrors?.sectionRequiredName ||
        '';
      const expiredDateRaw = returnErrors?.expiredDate;
      const expiry = this.formatExpiry(expiredDateRaw);
      const message = res.mensajeError ?? 'No se pudo escanear la entrada';
      const isExpired = message.toLowerCase().includes('expirad');
      const sectionName = isExpired ? '' : (requiredSection || this.seccionesOptions.find(s => s.num === this.seccionSelected)?.nombre || '');
      const subtitle = isExpired
        ? ''
        : (returnErrors?.subtitle || (sectionName ? 'Esta entrada debe ser escaneada por la sección:' : ''));
      const title = isExpired ? 'Aviso' : (sectionName ? 'Sección requerida' : 'Aviso');
      this.showScanMessage(message, 'error', {
        title,
        subtitle,
        sectionName: sectionName ? sectionName.toUpperCase() : '',
        expiryDateText: expiry.expiryDateText,
        expiryTimeText: expiry.expiryTimeText
      });
    });
  }
  
  formatExpiry(expiredDate: any): { expiryDateText: string, expiryTimeText: string } {
    if (!expiredDate) { return { expiryDateText: '', expiryTimeText: '' }; }
    const date = DateUtils.IsoString(expiredDate);
    if (!date) { return { expiryDateText: '', expiryTimeText: '' }; }
    const fmtDate = date.toLocaleDateString('es-AR', { day: '2-digit', month: 'short', year: 'numeric' }).replace('.', '');
    const fmtTime = date.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' }) + 'hs';
    return { expiryDateText: fmtDate, expiryTimeText: fmtTime };
  }
  
  showScanMessage(
    message:string,
    type: 'success' | 'error' = 'success',
    options?: { title?: string; subtitle?: string; sectionName?: string; expiryDateText?: string; expiryTimeText?: string }
  ) {
    this.modalMessage = message;
    this.modalType = type;
    this.modalIcon = type === 'success' ? 'assets/confirm.svg' : 'assets/errorScan.svg';
    this.modalTitle = options?.title ?? (type === 'success' ? 'Listo' : 'Aviso');
    this.modalSubtitle = options?.subtitle ?? '';
    this.modalSectionName = options?.sectionName ?? '';
    this.modalExpiryDate = options?.expiryDateText ?? '';
    this.modalExpiryTime = options?.expiryTimeText ?? '';
    this.isScanModalOpen  = true;
    if (type === 'success') {
      setTimeout(() => {
        this.isScanModalOpen  = false;
      }, 2000);
    }
  }
  
  closeScanModal() {
    this.isScanModalOpen = false;
  }

  search(event: any){
    if(event == ""){
      this.entr = [];
      return;
    } 
    this.entradaService.getListEntradas(this.eventoId, event).subscribe(res => {
      this.entr = res;
    })
  }

  seccionOnChange(event: any){
    const value = Number(event?.detail?.value ?? event);
    this.seccionSelected = isNaN(value) ? null : value;
    if (this.filter.trim()) {
      this.search(this.filter);
    }
  }

  private loadSecciones(): void {
    if (!this.eventoId) return;
    this.controlEntradasService.getByControlEntradas(this.eventoId).subscribe(res => {
      this.seccionesOptions = res?.secciones ?? [];
      if (this.seccionSelected === null && this.seccionesOptions.length === 1) {
        this.seccionSelected = this.seccionesOptions[0].num;
      }
    });
  }

  getTipoIdentificacionNombre(tipoValor: TipoDocs): string {
    const tipo = this.tipoIdentificacion.find(t => t.value === tipoValor);
    return tipo ? tipo.name : 'Desconocido';
  }

  goBack() {
    this.navCtrl.back({ animated: false });
  }


}
