import { ConfigStateService, PermissionService } from '@abp/ng.core';
import { Component, Input, OnInit } from '@angular/core';
import { EventosAsignadosDto } from '../proxy';
import { SeguridadService } from '../proxy/tickets/seguridad';
import { DateUtils } from 'src/app/utils/date-utils';
import {
  Platform,
  AlertController,
  RefresherCustomEvent,
  IonRouterOutlet,
  NavController,
} from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-eventos-asignados-rol-seg',
  templateUrl: './eventos-asignados-rol-seg.component.html',
  styleUrls: ['./eventos-asignados-rol-seg.component.scss'],
})
export class EventosAsignadosRolSegComponent implements OnInit {

  eventosAsignados: EventosAsignadosDto[] = [];
  @Input() mostrarEventosActivos: boolean = false;

  backButtonSubscription: any;

  EventosActivosTitle = 'Eventos Activos';
  EventosAsignadosTitle = 'Eventos Asignados';

  constructor(
    private seguridadService: SeguridadService,
    private permissionsService: PermissionService,
    private platform: Platform,
    private alert: AlertController,
    private routerOutlet: IonRouterOutlet,
    private navCtrl: NavController,
    private router: Router
  ) {}

  ngOnInit() {
    console.log(
      'EventosAsignadosRolSegComponent ngOnInit - mostrarEventosActivos:',
      this.mostrarEventosActivos
    );

    if (!this.mostrarEventosActivos) {
      this.seguridadService.getEventosAsignadosRolSeg().subscribe((res) => {
        this.eventosAsignados = res.map((funcion) => ({
          ...funcion,
          fecha: DateUtils.IsoString(funcion.fecha ?? '').toISOString(),
        }));
      });
    } else {
      this.seguridadService.getEventosActivosAdmCliente().subscribe((res) => {
        this.eventosAsignados = res.map((funcion) => ({
          ...funcion,
          fecha: DateUtils.IsoString(funcion.fecha ?? '').toISOString(),
        }));
      });
    }
  }

  handleRefresh(event: RefresherCustomEvent) {
    setTimeout(() => {
      this.ngOnInit();
      event.target.complete();
    }, 2500);
  }

  ionViewDidEnter() {
  
    if (this.platform.is('ios')) {
      this.routerOutlet.swipeGesture = false;
    }

    this.backButtonSubscription = this.platform.backButton.subscribeWithPriority(10, () => {
      this.presentExitConfirm();
    });
  }

  ionViewWillLeave() {
    if (this.platform.is('ios')) {
      this.routerOutlet.swipeGesture = true;
    }

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
        },
        {
          text: 'Sí',
          handler: () => {
            this.navCtrl.navigateRoot('/', { animated: false });
          },
        },
      ],
    });
    await alert.present();
  }

  toEscanearQR(id:string){
    this.navCtrl.navigateForward(['/eventos-asignados/escanear', id], {
      animated: false,
    });
  }
}
