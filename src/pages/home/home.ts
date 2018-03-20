import { Component, ViewChild } from '@angular/core';
import { NavController, LoadingController, Content, Searchbar } from 'ionic-angular';
import { Toast } from '@ionic-native/toast';
import { FilmDetailPage } from "../film-detail/film-detail";
import { FilmaffinServiceProvider } from '../../providers/filmaffin-service/filmaffin-service';
import * as Constants from '../../app/constants';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
    @ViewChild(Content) content: Content;
    @ViewChild('searchbar') searchbar: Searchbar;

    films: any;
    popularFilms: any;
    posterImgHost = Constants.POSTER_IMG_HOST;
    numResults: number;
    resultsOffset: number;
    infiniteScrollEnabled: boolean;
    searchBarVisible: boolean;

    constructor(
        public navCtrl: NavController,
        public loadingCtrl: LoadingController,
        public FilmaffinService: FilmaffinServiceProvider,
        private toast: Toast
    ) {
        this.numResults = Constants.NUM_RESULTS_POPULAR_FILMS;
        this.resultsOffset = 0;
        this.infiniteScrollEnabled = true;
        this.searchBarVisible = false;
    }

    ionViewDidLoad() {
        let loading = this.loadingCtrl.create({
            content: 'Cargando...'
        });

        loading.present();

        this.FilmaffinService.getPopularFilms(this.numResults, this.resultsOffset)
            .subscribe(
                (data) => {
                    loading.dismiss();
                    this.films = data;
                    this.resultsOffset += this.numResults;
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

    doInfinite(infiniteScroll) {
        if (!this.infiniteScrollEnabled) {
            infiniteScroll.complete();
            return;
        }

        this.FilmaffinService.getPopularFilms(this.numResults, this.resultsOffset)
            .subscribe(
                (data) => {
                    if (data) { // if we reached the end of results, we don't try to add 'null' results. It would fail
                        const dataLength = (<any>data).length;

                        for (let i = 0, len = dataLength; i < len; ++i) {
                            this.films.push(data[i]);
                        }

                        this.resultsOffset += this.numResults;
                    } else {
                        // If there's no data, we reached the end of results,
                        // therefore we must avoid to continue to try to get more data
                        infiniteScroll.enable(false);
                    }

                    infiniteScroll.complete();
                    },
                (error) =>{
                    infiniteScroll.complete();

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

    toggleSearchBar() {
        this.searchBarVisible = !this.searchBarVisible;
        this.popularFilms = this.films;

        if (this.searchBarVisible) {
            setTimeout(() => {
                this.searchbar.setFocus();
            });
        }
    }

    cancelSearch() {
        this.searchBarVisible = false;
        this.films = this.popularFilms;
        this.infiniteScrollEnabled = true;
        this.content.scrollToTop();
        this.searchbar.value = '';
    }

    clearSearch() {
        this.searchbar.value = '';
        this.films = this.popularFilms;
        this.content.scrollToTop();
    }

    searchFilm(search) {
        this.infiniteScrollEnabled = false;

        let searchString = search.target.value;
        if (searchString.length < 3) {
            return;
        }

        this.FilmaffinService.searchFilm(searchString)
            .subscribe(
                (data) => {
                    this.content.scrollToTop();

                    if (data) {
                        this.films = data;
                    }
                },
                (error) =>{
                    this.toast.show(
                        'No se encuentran resultados',
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
