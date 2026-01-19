import { Component, Input, OnInit } from '@angular/core';
import { ConfigStateService } from '@abp/ng.core';
import { EventosAsignadosDto } from '../proxy';
import { SeguridadService } from '../proxy/tickets/seguridad';
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
  isRefreshing = false;

  @Input() mostrarEventosActivos = false;

  backButtonSubscription: any;

  EventosActivosTitle = 'Eventos Activos';
  EventosAsignadosTitle = 'Eventos Asignados';
  esAdmin = false;
  esCliente = false;

  constructor(
    private config: ConfigStateService,
    private seguridadService: SeguridadService,
    private platform: Platform,
    private alert: AlertController,
    private routerOutlet: IonRouterOutlet,
    private navCtrl: NavController,
    private router: Router
  ) {}

  ngOnInit() {
    const currentUser = this.config.getOne('currentUser');
    this.esAdmin = currentUser?.roles?.includes('administrador') ?? false;
    this.esCliente = currentUser?.roles?.includes('cliente') ?? false;
    this.cargarEventos();
  }

  cargarEventos(showLoader = true, clearList = true) {
    this.loading = showLoader;
    if (clearList) {
      this.eventosAsignados = [];
    }

    const request$ = this.mostrarEventosActivos || this.esAdmin || this.esCliente
      ? this.seguridadService.getEventosActivosAdmCliente()
      : this.seguridadService.getEventosAsignadosRolSeg();

    request$.subscribe({
      next: (res) => {
        this.eventosAsignados = res;
      },
      error: () => {
        if (clearList) {
          this.eventosAsignados = [];
        }
      },
      complete: () => {
        this.loading = false;
        this.isRefreshing = false;
      },
    });
  }

  handleRefresh(event: RefresherCustomEvent) {
    this.isRefreshing = true;
    this.cargarEventos(false, false);
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

  toEscanearQR(evento: EventosAsignadosDto) {
    this.navCtrl.navigateForward(['/eventos-asignados/escanear', evento.id ?? ''], {
      animated: false,
      queryParams: { eventoNombre: evento.nombre ?? '' },
    });
  }

  formatEventoFecha(value: unknown): string {
    const date = this.toValidDate(value);
    if (date) {
      const fmtDate = date.toLocaleDateString('es-AR', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit',
      });
      const fmtTime = date.toLocaleTimeString('es-AR', {
        hour: '2-digit',
        minute: '2-digit',
      });
      return `${fmtDate} ${fmtTime}`;
    }
    if (typeof value === 'string') {
      const trimmed = value.trim();
      return trimmed || '';
    }
    return '';
  }

  private toValidDate(value: unknown): Date | null {
    if (!value) return null;
    if (value instanceof Date) {
      return isNaN(value.getTime()) ? null : value;
    }
    if (typeof value === 'number') {
      const date = new Date(value);
      return isNaN(date.getTime()) ? null : date;
    }
    if (typeof value === 'string') {
      const trimmed = value.trim();
      if (!trimmed) return null;
      const direct = new Date(trimmed);
      if (!isNaN(direct.getTime())) return direct;
      const hasTz = /Z$|[+-]\d{2}:?\d{2}$/.test(trimmed);
      const normalized = hasTz ? trimmed : `${trimmed}Z`;
      const isoDate = new Date(normalized);
      return isNaN(isoDate.getTime()) ? null : isoDate;
    }
    return null;
  }
}
