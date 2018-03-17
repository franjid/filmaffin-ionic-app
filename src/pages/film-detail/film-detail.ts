import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FilmaffinServiceProvider } from '../../providers/filmaffin-service/filmaffin-service';
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
      public navParams: NavParams,
      public FilmaffinService: FilmaffinServiceProvider
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
}
