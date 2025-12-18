import { LocalizationService } from '@abp/ng.core';
import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

export type IconName = 'confirm' | 'confirmPassword' | 'confirmCard' | 'confirmTicket' | 'warning' | 'warningTimer' | 'warningCard' | '';
export type Severity = 'info' | 'warning' | 'watch' | 'confirm';

export interface ModalData {
  icono?: IconName;
  title:string,
  subtitle?:string,
  confirmText?: string,
  cancelText?: string,
  redirectUrl?: string;
  callback?: (ret: boolean) => void;
  esCortesia?: boolean,
  masTiempo?:boolean,
  noCerrar?:boolean,
  infoExtra?: string,
  severity?: Severity,
}

@Injectable({
  providedIn: 'root'
})

export class CustomModalService {

  private showModalSubject = new Subject<ModalData>();
  public showModal$: Observable<ModalData> = this.showModalSubject.asObservable();

  private iconMap = {
    'confirm': 'assets/icons-modal/confirm.svg',
    'confirmPassword': 'assets/icons-modal/confirmPassword.svg',
    'confirmCard': 'assets/icons-modal/confirmCard.svg',
    'confirmTicket': 'assets/icons-modal/confirmTicket.svg',
    'warning': 'assets/icons-modal/warning.svg',
    'warningTimer': 'assets/icons-modal/warningTimer.svg',
    'warningCard': 'assets/icons-modal/warningCard.svg'
  };

  constructor(
    private localizationService: LocalizationService,
    private location: Location,
  ){}

  openModal(data: ModalData) {
    this.showModalSubject.next(data);
  }

  getIconUrl(iconName: IconName): string {
    return this.iconMap[iconName as keyof typeof this.iconMap] || '';
  }

  /* showCustomModal(titleCuentaActivada: string, nameIcono: IconName, redirect?: string) {
    this.customModalService.openModal({
      icono: nameIcono,
      title: titleCuentaActivada,
      redirectUrl: redirect ? redirect : null
    });
  } */

  /* showCustomModal(title: string, nameIcono: IconName, confirmar?: string, cancelar?: string, callback?: (ret: boolean) => void) {
    this.openModal({
      icono: nameIcono,
      title,
      confirmText: confirmar,
      cancelText: cancelar,
      callback
    });
  }
 */
  showCustomModal(
    title: string,
    nameIcono: IconName,
    redirect?: string | undefined,
    subtitle?: string,
    confirmar?: string,
    cancelar?: string,
    callback?: (ret: boolean) => void,
    esCortesia?: boolean,
    masTiempo?: boolean,
    noCerrar?: boolean,
    infoExtra?: string,
    ) {
      this.openModal({
        icono: nameIcono,
        title: this.localizationService.instant(title),
        redirectUrl: redirect ? redirect : undefined,
        subtitle: this.localizationService.instant(subtitle ?? ''),
        confirmText: this.localizationService.instant(confirmar ?? ''),
        cancelText: this.localizationService.instant(cancelar ?? ''),
        callback,
        esCortesia,
        masTiempo,
        noCerrar,
        infoExtra: this.localizationService.instant(infoExtra ?? '')
      });
    }

  volverAtras() {
    let si = this.localizationService.instant('::Si')
    let no = this.localizationService.instant('::No')
    let mensajeTitulo = this.localizationService.instant('::CancelarMsg')

    this.showCustomModal(mensajeTitulo, 'warning', undefined, undefined, si, no, (retorno: boolean) => {
      if (retorno) this.location.back()
      else return
    })
  }

  guardarDatos(): Observable<boolean>{
    let confirmacionTxt = this.localizationService.instant('::ContinuarMsg');
    let cambiosDes = this.localizationService.instant('::AccionDeshacer');
    let si = this.localizationService.instant('::Si');
    let no = this.localizationService.instant('::No');
    const confirmacion = new Subject<boolean>();
    this.showCustomModal(
      confirmacionTxt, 
      'warning', 
      '', 
      cambiosDes, 
      si, 
      no,
      (retorno: boolean) => {
        confirmacion.next(retorno);
        confirmacion.complete();
      })
    
      return confirmacion.asObservable();
  }

  //EJEMPLO DE LLAMAR AL MODAL

  /*
    constructor(
      private modalService: CustomModalService,
    ) {}
    
    showCustomModal() {
      this.modalService.openModal({
        icono: 'confirmCard',
        title: 'Compra exitosa',
        subtitle: 'Revisa tu correo para más información y detalles de tu compra.',
        confirmText: 'Confirmar',
        cancelText: 'Cancelar',
        redirectUrl:'/evento/mis-eventos
      });
    }

    si redirectUrl tiene valor, reedirige cuanto termine timeout, o se toca el boton confirmar

  */
  
}
