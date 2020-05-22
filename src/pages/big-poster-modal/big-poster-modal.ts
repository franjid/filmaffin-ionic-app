import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
    selector: 'page-big-poster-modal',
    templateUrl: 'big-poster-modal.html',
})
export class BigPosterModalPage {
    film: any;

    constructor(
        public viewCtrl: ViewController,
        public navParams: NavParams
    ) {
        this.film = this.navParams.get('film');
    }

    closeModal() {
        this.viewCtrl.dismiss();
    }
}
