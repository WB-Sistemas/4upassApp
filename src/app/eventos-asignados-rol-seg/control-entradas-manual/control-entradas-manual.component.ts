import { LocalizationService } from '@abp/ng.core';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TipoDocs } from 'src/app/proxy/usuario';
import { EntradaSimpleDto, EntradasService } from 'src/app/proxy/tickets/entradas';
import { CustomModalService } from 'src/app/services/custom-modal.service';
import { DeviceUtils } from 'src/app/utils/device-utils';
import { TiposDocList } from 'src/app/utils/doc-identificacion-utils';
import { RefresherCustomEvent } from '@ionic/angular';

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
  

  isScanModalOpen  = false; 
  modalMessage = ''; 
  
  constructor
  (
    private ar: ActivatedRoute,
    private entradaService: EntradasService,
    private customModal: CustomModalService,
    private localization:LocalizationService
  ){}

  ngOnInit(): void {
    this.isMobile = DeviceUtils.isMobile();
    this.tipoIdentificacion = TiposDocList(this.localization);
    this.ar.queryParams.subscribe(params =>{
      this.eventoId = params["eventoId"]
      console.log('Evento ID:', this.eventoId);
    })
  }

  handleRefresh(event: RefresherCustomEvent){
      setTimeout(() => {
        this.ngOnInit();
        event.target.complete();
      },2000);
  }

  confirmScan(scanned: boolean, idLegible: string) {
  if (scanned) return;
  this.entradaService.buscarTicketQR(this.eventoId, idLegible.toUpperCase()).subscribe(res => {
    if (res.exitoso) {
      const entradaIndex = this.entr.findIndex(e => e.idLegible === idLegible.toUpperCase());
      if (entradaIndex !== -1) {
        this.entr[entradaIndex].used = true;
      }
      this.showScanMessage("Entrada escaneada correctamente");
    }
  });
}

  showScanMessage(message:string) {
    this.modalMessage = message;
    this.isScanModalOpen  = true;
    setTimeout(() => {
      this.isScanModalOpen  = false;
    }, 2000);
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

  getTipoIdentificacionNombre(tipoValor: TipoDocs): string {
    const tipo = this.tipoIdentificacion.find(t => t.value === tipoValor);
    return tipo ? tipo.name : 'Desconocido';
  }


}
