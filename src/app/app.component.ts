import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { StatusBar, Style } from '@capacitor/status-bar';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private platform: Platform) {
    this.platform.ready().then(() => {
      this.configureStatusBar();
    });
  }

  private async configureStatusBar() {
    try {
      // No superponer la status bar
      await StatusBar.setOverlaysWebView({ overlay: false });

      // Mostrar siempre la barra
      await StatusBar.show();

      // Fondo oscuro alineado al layout
      await StatusBar.setBackgroundColor({ color: '#000' });

      // Iconos claros; en Android Style.Dark quita el modo "light status bar" (iconos oscuros)
      const style = this.platform.is('android') ? Style.Dark : Style.Light;
      await StatusBar.setStyle({ style });
    } catch (e) {
      console.debug('StatusBar config skipped:', e);
    }
  }
}
