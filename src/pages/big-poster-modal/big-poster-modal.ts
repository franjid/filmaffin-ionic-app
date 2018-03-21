import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import * as Constants from '../../app/constants';

@IonicPage()
@Component({
    selector: 'page-big-poster-modal',
    templateUrl: 'big-poster-modal.html',
})
export class BigPosterModalPage {
    film: any;
    posterImgHost = Constants.POSTER_IMG_HOST;

    constructor(
        public navCtrl: NavController,
        public viewCtrl: ViewController,
        public navParams: NavParams
    ) {
        this.film = this.navParams.get('film');
    }

    closeModal() {
        this.viewCtrl.dismiss();
    }
}
