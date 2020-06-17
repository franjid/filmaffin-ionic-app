import { Component } from '@angular/core';
import { LoadingController, ModalController, ToastController } from '@ionic/angular';
import * as Constants from '../../constants';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { BigPosterModalPage } from '../big-poster-modal/big-poster-modal';
import { FilmaffinServiceProvider } from '../../providers/filmaffin-service';
import { FilmaffinLocalDbServiceProvider } from '../../providers/filmaffin-local-db-service';
import { $e } from "@angular/compiler/src/chars";

@Component({
  selector: 'page-film-detail',
  templateUrl: 'film-detail.html',
  styleUrls: ['./film-detail.scss'],
})

export class FilmDetailPage {
  film: any;
  shareUrl = Constants.FILMAFFINITY_SHARE_URL;
  isFavoriteFilm: boolean | null = null;
  defaultHref: string;
  showReviewsType: string = 'pro';

  constructor(
    private actRoute: ActivatedRoute,
    private modalCtrl: ModalController,
    private location: Location,
    private ToastCtrl: ToastController,
    private socialSharing: SocialSharing,
    private loadingCtrl: LoadingController,
    private FilmaffinService: FilmaffinServiceProvider,
    private filmaffinLocalDb: FilmaffinLocalDbServiceProvider
  ) {
    this.defaultHref = '/films/popular';

    this.film = {
      title: null,
      rating: null,
      numRatings: null,
      year: null,
      duration: 60,
      country: null,
      posterImages: {
        medium: null
      },
      synopsis: null,
      directors: [],
      actors: [],
      topics: [],
      screenplayers: [],
      musicians: [],
      cinematographers: []
    };
  }

  async ngOnInit() {
    const filmId = this.actRoute.snapshot.params.filmId;

    await this.loadFilm(filmId);
  }

  async loadFilm(filmId) {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando...'
    });

    await loading.present();

    this.FilmaffinService.getFilm(filmId)
      .subscribe(
        (data) => {
          this.film = data[0];
          console.log(this.film);

          loading.dismiss();

          this.filmaffinLocalDb.isFavoriteFilm(this.film.idFilm)
            .then(res => {
              this.isFavoriteFilm = res;
            })
            .catch(error => {
              console.error(error);
            });
        },
        async (error) => {
          await loading.dismiss();

          const toast = await this.ToastCtrl.create({
            message: 'No se pueden cargar la película.' + ' \n' + 'Revisa tu conexión a internet.',
            buttons: [
              {
                text: 'Ok',
                role: 'cancel',
                handler: () => {
                  toast.dismiss();
                  this.loadFilm(filmId);
                }
              }
            ]
          });
          await toast.present();

          console.error(error);
        }
      );
  }

  async openBigPosterModal() {
    const bigPosterModal = await this.modalCtrl.create(
      {
        component: BigPosterModalPage,
        componentProps: {
          film: this.film
        }
      });

    bigPosterModal.present();
  }

  toggleFavoriteFilm() {
    if (this.isFavoriteFilm) {
      this.filmaffinLocalDb.deleteFavoriteFilm(this.film.idFilm)
        .then(() => {
          this.isFavoriteFilm = false;
        })
        .catch(error => {
          console.error(error);
        });
    } else {
      this.filmaffinLocalDb.saveFavoriteFilm(this.film.idFilm)
        .then(() => {
          this.isFavoriteFilm = true;
        })
        .catch(error => {
          console.error(error);
        });
    }
  }

  shareFilm() {
    this.socialSharing.share(null, null, null, this.shareUrl + this.film.idFilm).then(() => {
    }).catch(() => {
    });
  }

  segmentChanged($event) {
    this.showReviewsType = $event.detail.value;
  }
}
