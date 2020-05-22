import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController } from 'ionic-angular';
import { Toast } from '@ionic-native/toast';
import { FilmaffinLocalDbServiceProvider } from '../../providers/filmaffin-local-db-service/filmaffin-local-db-service';
import { FilmaffinServiceProvider } from '../../providers/filmaffin-service/filmaffin-service';
import {FilmDetailPage} from "../film-detail/film-detail";

@IonicPage()
@Component({
    selector: 'page-favorite-films',
    templateUrl: 'favorite-films.html',
})
export class FavoriteFilmsPage {
    films: any;

    constructor(
        public navCtrl: NavController,
        public loadingCtrl: LoadingController,
        public filmaffinLocalDb: FilmaffinLocalDbServiceProvider,
        public filmaffinService: FilmaffinServiceProvider,
        private toast: Toast
    ) {}

    ionViewWillEnter() {
        this.ionViewDidLoad();
    }

    ionViewDidLoad() {
        this.filmaffinLocalDb.getFavoriteFilms()
            .then(idFilms => {
                if (!Array.isArray(idFilms) || !idFilms.length) {
                    this.films = [];
                    return;
                }

                let loading = this.loadingCtrl.create({
                    content: 'Cargando...'
                });

                loading.present();

                this.filmaffinService.getFilm(idFilms.join(", "))
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
                        }
                    );
            })
            .catch(error =>{
                console.error(error);
            });
    }

    loadFilm(idFilm) {
        let loading = this.loadingCtrl.create({
            content: 'Cargando...'
        });

        loading.present();

        this.filmaffinService.getFilm(idFilm)
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
                }
            );
    }
}
