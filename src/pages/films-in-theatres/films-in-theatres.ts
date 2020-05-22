import {Component, ViewChild} from '@angular/core';
import { NavController, LoadingController, AlertController, Content } from 'ionic-angular';
import { Toast } from '@ionic-native/toast';
import { FilmaffinServiceProvider } from '../../providers/filmaffin-service/filmaffin-service';
import {FilmDetailPage} from "../film-detail/film-detail";

@Component({
    selector: 'films-in-theatres',
    templateUrl: 'films-in-theatres.html'
})
export class FilmsInTheatresPage {
    @ViewChild(Content) content: Content;

    films: any;
    sortBy: string;

    constructor(
        public navCtrl: NavController,
        public loadingCtrl: LoadingController,
        private alertCtrl: AlertController,
        public FilmaffinService: FilmaffinServiceProvider,
        private toast: Toast
    ) {
        this.sortBy = 'rating';
    }

    ionViewDidLoad() {
        this.loadPopularFilms(this.sortBy);
    }

    loadPopularFilms(sortBy: string) {
        let loading = this.loadingCtrl.create({
            content: 'Cargando...'
        });

        loading.present();


        this.FilmaffinService.getFilmsInTheatres(sortBy)
            .subscribe(
                (data) => {
                    loading.dismiss();
                    this.films = data;
                    this.content.scrollToTop();
                    this.sortBy = sortBy;
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

    loadFilm(idFilm: number) {
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

    showSortOptions() {
        let sortOptionsAlert = this.alertCtrl.create({
            title: 'Ordenar por',
            enableBackdropDismiss: true,
            buttons:[
                {
                    text: 'OK',
                    handler: data => {
                        if (data != this.sortBy) {
                            this.loadPopularFilms(data);
                        }
                    },
                    role: ''
                },
                {
                    text: 'Cancelar',
                    handler: data => {
                    },
                    role: 'cancel'
                }
            ],
            inputs:[
                {
                    type: 'radio',
                    id: 'sort_1',
                    name: 'sort_1',
                    'label': 'Fecha de estreno',
                    value: 'releaseDate',
                    'checked': this.sortBy == 'releaseDate'
                },
                {
                    type: 'radio',
                    id: 'sort_2',
                    name: 'sort_2',
                    'label': 'Puntuación',
                    value: 'rating',
                    'checked': this.sortBy == 'rating'
                },
                {
                    type: 'radio',
                    id: 'sort_3',
                    name: 'sort_3',
                    'label': 'Más votadas',
                    value: 'numRatings',
                    'checked': this.sortBy == 'numRatings'
                }
            ]
        });

        sortOptionsAlert.present();
    }
}
