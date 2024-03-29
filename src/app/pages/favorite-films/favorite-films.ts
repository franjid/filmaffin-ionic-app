import { Component } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { FilmaffinServiceProvider } from '../../providers/filmaffin-service';
import { Router } from '@angular/router';
import { FilmaffinLocalDbServiceProvider } from '../../providers/filmaffin-local-db-service';
import { AnalyticsProvider } from "../../providers/analytics";

@Component({
  selector: 'page-favorite-films',
  templateUrl: 'favorite-films.html',
  styleUrls: ['./favorite-films.scss'],
})

export class FavoriteFilmsPage {
  films: any;

  constructor(
    private router: Router,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private filmaffinService: FilmaffinServiceProvider,
    private filmaffinLocalDb: FilmaffinLocalDbServiceProvider,
    private analytics: AnalyticsProvider
  ) {
    this.films = null;
  }

  ionViewDidEnter() {
    this.analytics.trackView('favorite_films');
  }

  async ionViewWillEnter() {
    await this.loadFavoriteFilms();
  }

  async loadFavoriteFilms() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando...'
    });
    await loading.present();

    this.filmaffinLocalDb.getFavoriteFilms()
      .then(idFilms => {
        if (!Array.isArray(idFilms) || !idFilms.length) {
          this.films = [];
          loading.dismiss();
          return;
        }

        this.filmaffinService.getFilm(idFilms.join(', '))
          .subscribe(
            (data) => {
              this.films = data;
              loading.dismiss();
            },
            async (error) => {
              loading.dismiss();

              const toast = await this.toastCtrl.create({
                message: 'No se pueden cargar las películas.' + ' \n' + 'Revisa tu conexión a internet.',
                duration: 5000,
                buttons: [
                  {
                    text: 'Ok',
                    role: 'cancel',
                    handler: () => {
                      toast.dismiss();
                      this.loadFavoriteFilms();
                    }
                  }
                ]
              });
              await toast.present();

              console.error(error);
            }
          );
      })
      .catch(error => {
        loading.dismiss();
        console.error(error);
      });
  }
}
