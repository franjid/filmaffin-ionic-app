import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { BigPosterModalPage } from "../big-poster-modal/big-poster-modal";
import * as Constants from '../../app/constants';


@IonicPage()
@Component({
  selector: 'page-film-detail',
  templateUrl: 'film-detail.html',
})
export class FilmDetailPage {
    film: any;
    posterImgHost = Constants.POSTER_IMG_HOST;

    constructor(
      public navCtrl: NavController,
      public modalCtrl: ModalController,
      public navParams: NavParams
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
    }

    openBigPosterModal() {
        let bigPosterModal = this.modalCtrl.create(BigPosterModalPage, {film: this.film});

        bigPosterModal.present();
    }
}
