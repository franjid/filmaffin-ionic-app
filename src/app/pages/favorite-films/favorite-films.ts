import { Component } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { FilmaffinServiceProvider } from '../../providers/filmaffin-service';
import { Router } from '@angular/router';
import { FilmaffinLocalDbServiceProvider } from "../../providers/filmaffin-local-db-service";

@Component({
  selector: 'page-favorite-films',
  templateUrl: 'favorite-films.html',
  styleUrls: ['./favorite-films.scss'],
})

export class FavoriteFilmsPage {
  films: any;

  constructor(
    public router: Router,
    public loadingCtrl: LoadingController,
    private ToastCtrl: ToastController,
    public filmaffinService: FilmaffinServiceProvider,
    public filmaffinLocalDb: FilmaffinLocalDbServiceProvider,
  ) {
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
        loading.dismiss();

        if (!Array.isArray(idFilms) || !idFilms.length) {
          this.films = [];
          return;
        }

        this.filmaffinService.getFilm(idFilms.join(', '))
          .subscribe(
            (data) => {
              this.films = data;
            },
            async (error) => {
              const toast = await this.ToastCtrl.create({
                message: 'No se pueden cargar las películas.' + ' \n' + 'Revisa tu conexión a internet.',
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
        console.error(error);
      });
  }

  loadFilm(idFilm) {
    this.router.navigate(['films', idFilm]);
  }
}
