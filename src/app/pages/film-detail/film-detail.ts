import { Component, ViewChild } from '@angular/core';
import { IonContent, LoadingController, ModalController, ToastController } from '@ionic/angular';
import * as Constants from '../../constants';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { BigPosterModalPage } from '../big-poster-modal/big-poster-modal';
import { FilmaffinServiceProvider } from '../../providers/filmaffin-service';
import { FilmaffinLocalDbServiceProvider } from '../../providers/filmaffin-local-db-service';
import { FirebaseAnalyticsProvider } from "../../providers/firebase-analytics";
import { Film } from "../../interfaces/film";


@Component({
  selector: 'page-film-detail',
  templateUrl: 'film-detail.html',
  styleUrls: ['./film-detail.scss'],
})

export class FilmDetailPage {
  @ViewChild(IonContent, {static: false}) content: IonContent;

  film: Film;
  shareUrl = Constants.FILMAFFINITY_SHARE_URL;
  isFavoriteFilm: boolean | null = null;
  defaultHref: string;
  showReviewsType: string = 'pro';
  showSpoilers: Array<any> = [];
  sliderSpoilerOpts;
  sliderFramesOpts;

  constructor(
    private actRoute: ActivatedRoute,
    private modalCtrl: ModalController,
    private location: Location,
    private ToastCtrl: ToastController,
    private socialSharing: SocialSharing,
    private loadingCtrl: LoadingController,
    private FilmaffinService: FilmaffinServiceProvider,
    private filmaffinLocalDb: FilmaffinLocalDbServiceProvider,
    private firebaseAnalytics: FirebaseAnalyticsProvider
  ) {
    this.defaultHref = '/films/popular';

    this.film = {
      idFilm: null,
      title: null,
      originalTitle: null,
      rating: null,
      numRatings: null,
      year: null,
      duration: 60,
      country: null,
      posterImages: {
        small: null,
        medium: null,
        large: null
      },
      synopsis: null,
      directors: [],
      actors: [],
      topics: [],
      genres: [],
      screenplayers: [],
      musicians: [],
      cinematographers: [],
      proReviews: [],
      userReviews: [],
      numFrames: 0,
      frames: []
    };

    this.sliderSpoilerOpts = {
      initialSlide: 2,
      speed: 400
    };

    this.sliderFramesOpts = {
      initialSlide: 0,
      speed: 400,
      loop: true
    };
  }

  async ngOnInit() {
    const filmId = this.actRoute.snapshot.params.filmId;

    await this.loadFilm(filmId);
  }

  ionViewDidEnter() {
    this.firebaseAnalytics.trackView('film_detail');
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

          if (!this.film.proReviews.length && this.film.userReviews.length) {
            this.showReviewsType = 'users';
          }

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
          this.firebaseAnalytics.trackEvent('film_detail_favorite_deleted', {idFilm: this.film.idFilm});
          this.isFavoriteFilm = false;
        })
        .catch(error => {
          console.error(error);
        });
    } else {
      this.filmaffinLocalDb.saveFavoriteFilm(this.film.idFilm)
        .then(() => {
          this.firebaseAnalytics.trackEvent('film_detail_favorite_added', {idFilm: this.film.idFilm});
          this.isFavoriteFilm = true;
        })
        .catch(error => {
          console.error(error);
        });
    }
  }

  shareFilm() {
    this.socialSharing.share(null, null, null, this.shareUrl + this.film.idFilm).then(() => {
      this.firebaseAnalytics.trackEvent('film_detail_shared', {idFilm: this.film.idFilm});
    }).catch(() => {
    });
  }

  segmentChanged($event) {
    this.showReviewsType = $event.detail.value;
  }

  onSlideDidChange(event, spoilerBoxId) {
    let spoilerBox = document.getElementById(spoilerBoxId);

    event.target.isEnd().then((isEnd) => {
      if (isEnd) {
        this.showSpoilers[spoilerBoxId] = false;
      }
    });

    event.target.isBeginning().then((isBeggining) => {
      if (isBeggining) {
        this.showSpoilers[spoilerBoxId] = true;
        this.content.scrollToPoint(0, spoilerBox.offsetTop - 5, 1000);
      }
    });
  }
}
