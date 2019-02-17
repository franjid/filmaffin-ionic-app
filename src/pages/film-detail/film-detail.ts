import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';
import { BigPosterModalPage } from "../big-poster-modal/big-poster-modal";
import * as Constants from '../../app/constants';
import { FilmaffinLocalDbServiceProvider } from '../../providers/filmaffin-local-db-service/filmaffin-local-db-service';

@IonicPage()
@Component({
  selector: 'page-film-detail',
  templateUrl: 'film-detail.html',
})
export class FilmDetailPage {
    film: any;
    posterImgHost = Constants.POSTER_IMG_HOST;
    shareUrl = Constants.FILMAFFINITY_SHARE_URL;
    isFavoriteFilm: boolean;

    constructor(
      public navCtrl: NavController,
      public modalCtrl: ModalController,
      public navParams: NavParams,
      public filmaffinLocalDb: FilmaffinLocalDbServiceProvider,
      private socialSharing: SocialSharing
    ) {
        this.film = {
            title: '',
            rating: '',
            numRatings: '',
            year: '',
            duration: 60,
            country: 'us',
            posterImages: {
                medium: ''
            },
            synopsis: '',
            directors: [],
            actors: [],
            topics: [],
            screenplayers: [],
            musicians: [],
            cinematographers: []
        };
    }

    ionViewDidLoad() {
        this.film = this.navParams.get('film');

        this.filmaffinLocalDb.isFavoriteFilm(this.film.idFilm)
            .then(res => {
                this.isFavoriteFilm = res;
            })
            .catch(error =>{
                console.error(error);
            });
    }

    openBigPosterModal() {
        let bigPosterModal = this.modalCtrl.create(BigPosterModalPage, {film: this.film});

        bigPosterModal.present();
    }

    toggleFavoriteFilm(idFilm: number) {
        if (this.isFavoriteFilm) {
            this.filmaffinLocalDb.deleteFavoriteFilm(idFilm)
                .then(() => {
                    this.isFavoriteFilm = false;
                })
                .catch(error =>{
                    console.error(error);
                });
        } else {
            this.filmaffinLocalDb.saveFavoriteFilm(idFilm)
                .then(() => {
                    this.isFavoriteFilm = true;
                })
                .catch(error =>{
                    console.error(error);
                });
        }
    }

    shareFilm(idFilm: number) {
        this.socialSharing.share(null, null, null, this.shareUrl + idFilm).then(() => {
        }).catch(() => {
        });
    }
}
