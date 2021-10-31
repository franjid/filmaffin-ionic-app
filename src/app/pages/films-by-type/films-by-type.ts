import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { AlertController, IonContent, LoadingController, ToastController } from "@ionic/angular";
import { FilmaffinServiceProvider } from "../../providers/filmaffin-service";
import * as Constants from "../../constants";

@Component({
  selector: 'app-films-by-type',
  templateUrl: './films-by-type.html',
  styleUrls: ['./films-by-type.scss'],
})
export class FilmsByType implements OnInit {
  @ViewChild(IonContent, {static: false}) content: IonContent;

  type: string;
  name: string;
  defaultHref: string;
  films: any;
  numResults: number;
  resultsOffset: number;
  sortBy: string;
  infiniteScrollEnabled: boolean;
  infiniteScroll;

  constructor(
    private actRoute: ActivatedRoute,
    private loadingCtrl: LoadingController,
    private filmaffinService: FilmaffinServiceProvider,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
  ) {
    this.type = this.actRoute.snapshot.params.type;
    this.name = this.actRoute.snapshot.params.name;
    this.defaultHref = '/films/popular';
    this.numResults = Constants.NUM_RESULTS_FILMS_BY_TYPE;
    this.resultsOffset = 0;
    this.infiniteScrollEnabled = true;
  }

  async ngOnInit() {
    this.sortBy = 'year';

    await this.loadFilmByType();
  }

  async loadFilmByType() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando...'
    });
    await loading.present();

    this.filmaffinService.getFilmsByType(this.type, this.name, this.sortBy, this.numResults, this.resultsOffset)
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
                  this.loadFilmByType();
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

    this.filmaffinService.getFilmsByType(this.type, this.name, this.sortBy, this.numResults, this.resultsOffset)
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
          console.log('infiniteScroll');
          console.log(infiniteScroll);
          infiniteScroll.target.complete();

          if (error.status !== 404) {
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

            console.error('error');
            console.error(error);
          }
        }
      );
  }

  async showSortOptions() {
    const inputHandler = data => {
      if (this.sortBy !== data.value) {
        sortOptionsAlert.dismiss();
        this.resultsOffset = 0;
        this.sortBy = data.value;
        this.loadFilmByType();
        this.content.scrollToTop();
      }
    };

    const sortOptionsAlert = await this.alertCtrl.create({
      header: 'Ordenar por',
      backdropDismiss: true,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: data => {
          }
        }
      ],
      inputs: [
        {
          type: 'radio',
          id: 'sort_1',
          name: 'sort_1',
          label: 'Año de estreno',
          value: 'year',
          checked: this.sortBy == 'year',
          handler: inputHandler
        },
        {
          type: 'radio',
          id: 'sort_2',
          name: 'sort_2',
          label: 'Puntuación',
          value: 'rating',
          checked: this.sortBy == 'rating',
          handler: inputHandler
        }
      ]
    });

    await sortOptionsAlert.present();
  }
}
