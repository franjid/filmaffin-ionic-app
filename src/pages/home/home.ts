import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Toast } from '@ionic-native/toast';
import { FilmDetailPage } from "../film-detail/film-detail";
import { FilmaffinServiceProvider } from '../../providers/filmaffin-service/filmaffin-service';
import * as Constants from '../../app/constants';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
    films: any;
    posterImgHost = Constants.POSTER_IMG_HOST;

    constructor(
        public navCtrl: NavController,
        public FilmaffinService: FilmaffinServiceProvider,
        private toast: Toast
    ) {
    }

    ionViewDidLoad() {
        this.FilmaffinService.getPopularFilms()
            .subscribe(
                (data) => {
                    this.films = data;
                },
                (error) =>{
                    this.toast.show(
                        'No se pueden cargar las películas.' +
                        ' \n' +
                        'Revisa tu conexión a internet',
                        '5000',
                        'bottom').subscribe(
                        toast => {
                            console.log(toast);
                        }
                    );

                    console.error(error);
                }
            );
    }

    loadFilm(idFilm) {
        this.FilmaffinService.getFilm(idFilm)
            .subscribe(
                (data) => {
                    this.navCtrl.push(FilmDetailPage, {
                        film: data[0]
                    });
                },
                (error) =>{
                    this.toast.show(
                        'No se puede cargar la película.' +
                        ' \n' +
                        'Revisa tu conexión a internet',
                        '5000',
                        'bottom').subscribe(
                        toast => {
                            console.log(toast);
                        }
                    );

                    console.error(error);
                }
            );
    }
}
