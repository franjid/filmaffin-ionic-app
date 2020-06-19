import { Component } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { FirebaseAnalyticsProvider } from "../../providers/firebase-analytics";

@Component({
  selector: 'page-big-poster-modal',
  templateUrl: 'big-poster-modal.html',
  styleUrls: ['./big-poster-modal.scss'],
})

export class BigPosterModalPage {
  film: any;

  constructor(
    public modalCtrl: ModalController,
    public navParams: NavParams,
    private firebaseAnalytics: FirebaseAnalyticsProvider
  ) {
    this.film = this.navParams.get('film');
  }

  ionViewDidEnter() {
    this.firebaseAnalytics.trackView('big_poster_modal');
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }
}
