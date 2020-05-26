import { Component, ViewChild } from '@angular/core';
import { LoadingController, ToastController, IonContent, IonSearchbar } from '@ionic/angular';
import { Router } from '@angular/router';
import { FilmaffinServiceProvider } from '../../providers/filmaffin-service';
import * as Constants from '../../constants';

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
  searchBarVisible: boolean;

  constructor(
    public loadingCtrl: LoadingController,
    public FilmaffinService: FilmaffinServiceProvider,
    private ToastCtrl: ToastController,
    public router: Router,
  ) {
    this.numResults = Constants.NUM_RESULTS_POPULAR_FILMS;
    this.resultsOffset = 0;
    this.infiniteScrollEnabled = true;
    this.searchBarVisible = false;
  }

  async ngOnInit() {
    await this.loadPopularFilms();
  }

  async loadPopularFilms() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando...'
    });
    await loading.present();

    this.FilmaffinService.getPopularFilms(this.numResults, this.resultsOffset)
      .subscribe(
        (data) => {
          loading.dismiss();
          this.films = data;
          this.resultsOffset += this.numResults;
        },
        async (error) => {
          await loading.dismiss();

          const toast = await this.ToastCtrl.create({
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
            infiniteScroll.target.disabled = true;
          }

          infiniteScroll.target.complete();
        },
        async (error) => {
          console.log(infiniteScroll);
          infiniteScroll.target.complete();

          const toast = await this.ToastCtrl.create({
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

  loadFilm(idFilm) {
    this.router.navigate(['films', idFilm]);
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
        async (error) => {
          const toast = await this.ToastCtrl.create({
            message: 'No se encuentran resultados.',
            duration: 5000
          });
          await toast.present();

          console.error(error);
        }
      );
  }
}
