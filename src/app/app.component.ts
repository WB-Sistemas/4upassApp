import { Component } from '@angular/core';
import { StatusBar, Style } from '@capacitor/status-bar';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor() {
    this.configureStatusBar();
  }

  private async configureStatusBar() {
    try {
      // No superponer la status bar; el contenido arranca debajo
      await StatusBar.setOverlaysWebView({ overlay: false });
      // Asegurar que la barra esté visible
      await StatusBar.show();
      // Fijar color de fondo para que combine con el header oscuro
      await StatusBar.setBackgroundColor({ color: '##ffffff' });
      // Usa iconos claros porque el header es oscuro
      await StatusBar.setStyle({ style: Style.Light });
    } catch (e) {
      // En web o si el plugin no está disponible, ignorar
      console.debug('StatusBar config skipped:', e);
    }
  }

}
