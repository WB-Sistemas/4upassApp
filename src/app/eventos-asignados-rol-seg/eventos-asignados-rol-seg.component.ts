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
  loading = true;

  @Input() mostrarEventosActivos = false;

  backButtonSubscription: any;

  EventosActivosTitle = 'Eventos Activos';
  EventosAsignadosTitle = 'Eventos Asignados';

  constructor(
    private seguridadService: SeguridadService,
    private platform: Platform,
    private alert: AlertController,
    private routerOutlet: IonRouterOutlet,
    private navCtrl: NavController,
    private router: Router
  ) {}

  ngOnInit() {
    this.cargarEventos();
  }

  cargarEventos() {
    this.loading = true;
    this.eventosAsignados = [];

    const request$ = this.mostrarEventosActivos
      ? this.seguridadService.getEventosActivosAdmCliente()
      : this.seguridadService.getEventosAsignadosRolSeg();

    request$.subscribe({
      next: (res) => {
        this.eventosAsignados = res.map((funcion) => ({
          ...funcion,
          fecha: DateUtils.IsoString(funcion.fecha ?? '').toISOString(),
        }));
      },
      error: () => {
        this.eventosAsignados = [];
      },
      complete: () => {
        this.loading = false;
      },
    });
  }

  handleRefresh(event: RefresherCustomEvent) {
    this.cargarEventos();
    setTimeout(() => event.target.complete(), 800);
  }

  ionViewDidEnter() {
    if (this.platform.is('ios')) {
      this.routerOutlet.swipeGesture = false;
    }

    this.backButtonSubscription =
      this.platform.backButton.subscribeWithPriority(10, () => {
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
      message: '¿Desea cerrar la sesión?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'btn-cancel',
        },
        {
          text: 'Sí',
          cssClass: 'btn-confirm',
          handler: () => {
            this.navCtrl.navigateRoot('/', { animated: false });
          },
        },
      ],
    });

    await alert.present();
  }

  toEscanearQR(id: string) {
    this.navCtrl.navigateForward(['/eventos-asignados/escanear', id], {
      animated: false,
    });
  }
}
