import { Component, ViewChild } from '@angular/core';
import { LoadingController, AlertController, IonContent, ToastController } from '@ionic/angular';
import { FilmaffinServiceProvider } from '../../providers/filmaffin-service';
import { Router } from '@angular/router';
import { AnalyticsProvider } from "../../providers/analytics";

@Component({
  selector: 'films-in-theatres',
  templateUrl: 'films-in-theatres.html',
  styleUrls: ['./films-in-theatres.scss'],
})

export class FilmsInTheatresPage {
  @ViewChild(IonContent, {static: false}) content: IonContent;

  films: any;
  sortBy: string;

  constructor(
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private filmaffinService: FilmaffinServiceProvider,
    private toastCtrl: ToastController,
    private router: Router,
    private analytics: AnalyticsProvider
  ) {
    this.sortBy = 'releaseDate';
  }

  async ngOnInit() {
    await this.loadFilmsInTheatres(this.sortBy);
  }

  ionViewDidEnter() {
    this.analytics.trackView('films_in_theatres');
  }

  async loadFilmsInTheatres(sortBy: string) {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando...'
    });
    await loading.present();

    this.filmaffinService.getFilmsInTheatres(sortBy)
      .subscribe(
        (data) => {
          loading.dismiss();
          this.films = data;
          this.content.scrollToTop();
          this.sortBy = sortBy;
        },
        async (error) => {
          loading.dismiss();

          const toast = await this.toastCtrl.create({
            message: 'No se pueden cargar las películas.' + ' \n' + 'Revisa tu conexión a internet.',
            buttons: [
              {
                text: 'Ok',
                role: 'cancel',
                handler: () => {
                  toast.dismiss();
                  this.loadFilmsInTheatres(sortBy);
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

  async showSortOptions() {
    const inputHandler = data => {
      if (this.sortBy !== data.value) {
        this.analytics.trackEvent('films_in_theatres_sort', {sortBy: this.sortBy});

        sortOptionsAlert.dismiss();
        this.loadFilmsInTheatres(data.value);
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
          label: 'Fecha de estreno',
          value: 'releaseDate',
          checked: this.sortBy == 'releaseDate',
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
        },
        {
          type: 'radio',
          id: 'sort_3',
          name: 'sort_3',
          label: 'Más votadas',
          value: 'numRatings',
          checked: this.sortBy == 'numRatings',
          handler: inputHandler
        }
      ]
    });

    await sortOptionsAlert.present();
  }

  refreshContent(event) {
    this.loadFilmsInTheatres(this.sortBy).then(() => {
      event.target.complete();
    })
  }
}
