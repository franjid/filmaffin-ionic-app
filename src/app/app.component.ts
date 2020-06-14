import { Component } from '@angular/core';

import { AlertController, MenuController, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { FilmaffinLocalDbServiceProvider } from './providers/filmaffin-local-db-service';
import { LocalDbServiceProvider } from './providers/local-db-service';
import { Storage } from '@ionic/storage';
import { FCM } from '@ionic-native/fcm/ngx';
import * as Constants from './constants';

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
    this.storage.get(Constants.Storage.DARK_MODE).then((value) => {
      this.darkMode = !!value;
    });

    this.initializeApp();
  }

  initializeApp() {
    // this.storage.remove(Constants.Storage.ID_USER_LOGGED_IN);
    // this.storage.remove(Constants.Storage.FRIENDS_SYNCED);

    this.platform.ready().then(() => {
      if (this.platform.is('cordova')) {
        this.fcm.getToken().then(token => {
          this.storage.set(Constants.Storage.APP_NOTIFICATIONS_TOKEN, token);
        });

        this.fcm.onNotification().subscribe(data => {
          if (data.action === 'friends_sync_finished') {
            this.storage.set(Constants.Storage.FRIENDS_SYNCED, true).then(() => {
              if (data.wasTapped) {
                console.log('Received in background');
                this.router.navigate(['films/friends']);
              } else {
                console.log('Received in foreground');
                this.showFriendsSyncCompleted();
              }
            })
          }
        });
      }

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
      header: 'Sincronización de amigos finalizada',
      message: '¿Quieres ver ahora las últimas votaciones de tus amigos?',
      backdropDismiss: true,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.router.navigate(['films/friends']);
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
    this.storage.set(Constants.Storage.DARK_MODE, this.darkMode);
  }
}
