import { ConfigStateService, PermissionService } from '@abp/ng.core';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventosAsignadosDto } from '../proxy';
import { SeguridadService } from '../proxy/tickets/seguridad';
import { DateUtils } from 'src/app/utils/date-utils';
import { Platform, AlertController, NavController, RefresherCustomEvent } from '@ionic/angular';

@Component({
  selector: 'app-eventos-asignados-rol-seg',
  templateUrl: './eventos-asignados-rol-seg.component.html',
  styleUrls: ['./eventos-asignados-rol-seg.component.scss'],
})
export class EventosAsignadosRolSegComponent{

  eventosAsignados: EventosAsignadosDto[] = []
  redirect: boolean = false;
  hasAccess: boolean = false;
  @Input() mostrarEventosActivos:boolean= false;
  backButtonSubscription: any;


  constructor(
    private seguridadService: SeguridadService,
    private permissionsService: PermissionService,
    private router: Router,
    private plataform: Platform,
    private alert: AlertController,
    private navCtrl: NavController
  )
  {}

  EventosActivosTitle = 'Eventos Activos';
  EventosAsignadosTitle = 'Eventos Asignados';

  ngOnInit(){


    console.log('EventosAsignadosRolSegComponent ngOnInit - mostrarEventosActivos:', this.mostrarEventosActivos);
    if (!this.mostrarEventosActivos) {
      this.seguridadService.getEventosAsignadosRolSeg().subscribe(res=>{
        this.eventosAsignados = res.map(funcion => {
          return {
            ...funcion,
            fecha: DateUtils.IsoString(funcion.fecha ?? '').toISOString()
          }
        });
      })
    } else {
      this.seguridadService.getEventosActivosAdmCliente().subscribe((res) => {
          this.eventosAsignados = res.map((funcion) => ({
            ...funcion,
            fecha: DateUtils.IsoString(funcion.fecha?? '').toISOString(),
          }));
        });
    }

  }

  handleRefresh(event: RefresherCustomEvent){
    setTimeout(() => {
      this.ngOnInit();
      event.target.complete();
    },2000);
  }

  ionViewDidEnter() {
    this.backButtonSubscription = this.plataform.backButton.subscribeWithPriority(10, () => {
      this.presentExitConfirm();
    });
  }

  ionViewWillLeave() {
    if (this.backButtonSubscription) {
      this.backButtonSubscription.unsubscribe();
    }
  }

  async presentExitConfirm() {
    const alert = await this.alert.create({
      header: 'Confirmar',
      message: '¿Querés salir de esta página?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {            
          },
        },
        {
          text: 'Sí',
          handler: () => {
            this.router.navigate(['/'], {replaceUrl: true});
          },
        },
      ],
    });
    await alert.present();
  }

  toEscanearQR(id:string){
   this.router.navigate(['/eventos-asignados/escanear', id]);
  }

}
