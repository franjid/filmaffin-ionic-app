import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { Toast } from '@ionic-native/toast';
import { FilmaffinServiceProvider } from '../../providers/filmaffin-service/filmaffin-service';
import * as Constants from '../../app/constants';
import {FilmDetailPage} from "../film-detail/film-detail";

@Component({
    selector: 'films-in-theatres',
    templateUrl: 'films-in-theatres.html'
})
export class FilmsInTheatresPage {
    films: any;
    posterImgHost = Constants.POSTER_IMG_HOST;

    constructor(
        public navCtrl: NavController,
        public loadingCtrl: LoadingController,
        public FilmaffinService: FilmaffinServiceProvider,
        private toast: Toast
    ) {
    }

    ionViewDidLoad() {
        let loading = this.loadingCtrl.create({
            content: 'Cargando...'
        });

        loading.present();


        this.FilmaffinService.getFilmsInTheatres()
            .subscribe(
                (data) => {
                    loading.dismiss();
                    this.films = data;
                },
                (error) =>{
                    loading.dismiss();

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
        let loading = this.loadingCtrl.create({
            content: 'Cargando...'
        });

        loading.present();


        this.FilmaffinService.getFilm(idFilm)
            .subscribe(
                (data) => {
                    loading.dismiss();

                    this.navCtrl.push(FilmDetailPage, {
                        film: data[0]
                    });
                },
                (error) =>{
                    loading.dismiss();

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
