import { Component } from '@angular/core';

import { AlertController, MenuController, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { Router } from '@angular/router';
import { FilmaffinLocalDbServiceProvider } from './providers/filmaffin-local-db-service';
import { LocalDbServiceProvider } from './providers/local-db-service';
import { Storage } from '@ionic/storage';
import { FCM } from '@ionic-native/fcm/ngx';

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
    public router: Router,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private filmaffinLocalDb: FilmaffinLocalDbServiceProvider,
    private localDb: LocalDbServiceProvider,
    private storage: Storage,
    private fcm: FCM,
    private alertCtrl: AlertController
  ) {
    this.storage.get('dark_mode').then((value) => {
      this.darkMode = !!value;
    });

    this.initializeApp();
  }

  initializeApp() {
    // this.storage.remove('isLoggedIn');

    this.platform.ready().then(() => {
      this.fcm.getToken().then(token => {
        console.log(token);
      });

      this.fcm.onNotification().subscribe(data => {
        if (data.wasTapped) {
          console.log('Received in background');

          switch (data.action) {
            case 'friends_sync_finished':
              this.router.navigate(['films/theatres']);
              break;
          }
        } else {
          console.log('Received in foreground');

          if (data.action === 'friends_sync_finished') {
            this.showFriendsSyncCompleted();
          }
        }
      });

      this.localDb.ready.then(() => {
        this.filmaffinLocalDb.createFavoriteFilmTable().then(() => {
          this.statusBar.styleDefault();
          this.splashScreen.hide();
        });
      });
    });
  }

  async showFriendsSyncCompleted() {
    const alert = await this.alertCtrl.create({
      header: 'Sincronización de tus amigos finalizada',
      message: '¿Quieres ver ahora las últimas votaciones de tus amigos?',
      backdropDismiss: true,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.router.navigate(['films/theatres']);
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel',
        }
      ]
    });

    await alert.present();
  }

  storeDarkMode() {
    this.storage.set('dark_mode', this.darkMode);
  }
}
