import { Component, ViewChild } from '@angular/core';
import { LoadingController, ToastController, IonContent, IonSearchbar } from '@ionic/angular';
import { FilmaffinServiceProvider } from '../../providers/filmaffin-service';
import * as Constants from '../../constants';
import { FirebaseAnalyticsProvider } from "../../providers/firebase-analytics";

@Component({
  selector: 'page-popular-films',
  templateUrl: 'popular-films.html',
  styleUrls: ['./popular-films.scss'],
})

export class PopularFilmsPage {
  @ViewChild(IonContent, {static: false}) content: IonContent;
  @ViewChild(IonSearchbar, {static: false}) searchbar: IonSearchbar;

  films: any;
  popularFilms: any;
  numResults: number;
  resultsOffset: number;
  infiniteScrollEnabled: boolean;
  infiniteScroll;
  searchBarVisible: boolean;
  searchResults: null | boolean;

  constructor(
    private loadingCtrl: LoadingController,
    private filmaffinService: FilmaffinServiceProvider,
    private toastCtrl: ToastController,
  private firebaseAnalytics: FirebaseAnalyticsProvider,
  ) {
    this.numResults = Constants.NUM_RESULTS_POPULAR_FILMS;
    this.resultsOffset = 0;
    this.infiniteScrollEnabled = true;
    this.searchBarVisible = false;
    this.searchResults = null;
  }

  async ngOnInit() {
    await this.loadPopularFilms();
    // this.firebaseAnalytics.trackView('popular_films');

  }

  ionViewDidEnter() {
    this.firebaseAnalytics.trackView('popular_films');
  }

  async loadPopularFilms() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando...'
    });
    await loading.present();

    this.filmaffinService.getPopularFilms(this.numResults, this.resultsOffset)
      .subscribe(
        (data) => {
          loading.dismiss();
          this.films = data;
          this.resultsOffset += this.numResults;
        },
        async (error) => {
          await loading.dismiss();

          const toast = await this.toastCtrl.create({
            message: 'No se pueden cargar las películas.' + ' \n' + 'Revisa tu conexión a internet.',
            buttons: [
              {
                text: 'Ok',
                role: 'cancel',
                handler: () => {
                  toast.dismiss();
                  this.loadPopularFilms();
                }
              }
            ]
          });
          await toast.present();

          console.error(error);
        }
      );
  }

  doInfinite(infiniteScroll) {
    this.infiniteScroll = infiniteScroll;

    if (!this.infiniteScrollEnabled) {
      infiniteScroll.complete();
      return;
    }

    this.filmaffinService.getPopularFilms(this.numResults, this.resultsOffset)
      .subscribe(
        (data) => {
          if (data) { // if we reached the end of results, we don't try to add 'null' results. It would fail
            const dataLength = (data as any).length;

            for (let i = 0, len = dataLength; i < len; ++i) {
              this.films.push(data[i]);
            }

            this.resultsOffset += this.numResults;
          } else {
            /**
             * If there's no data, we reached the end of results,
             * therefore we must avoid to continue to try to get more data
             */
            infiniteScroll.target.disabled = true;
          }

          infiniteScroll.target.complete();
        },
        async (error) => {
          console.log(infiniteScroll);
          infiniteScroll.target.complete();

          const toast = await this.toastCtrl.create({
            message: 'No se pueden cargar las películas.' + ' \n' + 'Revisa tu conexión a internet.',
            buttons: [
              {
                text: 'Ok',
                role: 'cancel',
                handler: () => {
                  toast.dismiss();
                  this.doInfinite(infiniteScroll)
                }
              }
            ]
          });
          await toast.present();

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
    this.clearSearch();
    this.searchBarVisible = false;
  }

  clearSearch() {
    this.searchbar.value = '';
    this.films = this.popularFilms;
    this.infiniteScrollEnabled = true;
    this.content.scrollToTop();
    this.searchResults = null;
  }

  searchFilm(search) {
    this.infiniteScrollEnabled = false;

    const searchString = search.target.value;

    if (searchString.length < 3) {
      return;
    }

    this.firebaseAnalytics.trackEvent('popular_films_search', {search: searchString});

    this.filmaffinService.searchFilm(searchString)
      .subscribe(
        (data) => {
          this.content.scrollToTop();

          if (data) {
            this.films = data;
            this.searchResults = true;
          } else {
            this.films = [];
            this.searchResults = false;
          }
        },
        async (error) => {
          this.films = [];
          this.searchResults = false;

          console.error(error);
        }
      );
  }

  refreshContent(event) {
    this.resultsOffset = 0;

    this.loadPopularFilms().then(() => {
      event.target.complete();

      if (this.infiniteScroll) {
        this.infiniteScroll.target.disabled = false;
      }
    })
  }
}
