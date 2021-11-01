import { Component } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { AnalyticsProvider } from "../../providers/analytics";

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
    private analytics: AnalyticsProvider
  ) {
    this.film = this.navParams.get('film');
  }

  ionViewDidEnter() {
    this.analytics.trackView('big_poster_modal');
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }
}
