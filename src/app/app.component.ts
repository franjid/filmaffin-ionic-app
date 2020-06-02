import { Component } from '@angular/core';

import { MenuController, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { Router } from '@angular/router';
import { FilmaffinLocalDbServiceProvider } from './providers/filmaffin-local-db-service';
import { LocalDbServiceProvider } from './providers/local-db-service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  darkMode: boolean;

  constructor(
    private menu: MenuController,
    private platform: Platform,
    private router: Router,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private filmaffinLocalDb: FilmaffinLocalDbServiceProvider,
    private localDb: LocalDbServiceProvider,
    private storage: Storage
  ) {
    this.storage.get('dark_mode').then((value) => {
      this.darkMode = !!value;
    });

    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.localDb.ready.then(() => {
        this.filmaffinLocalDb.createFavoriteFilmTable().then(() => {
          this.statusBar.styleDefault();
          this.splashScreen.hide();
        });
      });
    });
  }

  storeDarkMode() {
    this.storage.set('dark_mode', this.darkMode);
  }
}
