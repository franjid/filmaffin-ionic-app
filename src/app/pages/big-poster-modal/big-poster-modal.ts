import { Component } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';

@Component({
  selector: 'page-big-poster-modal',
  templateUrl: 'big-poster-modal.html',
  styleUrls: ['./big-poster-modal.scss'],
})

export class BigPosterModalPage {
  film: any;

  constructor(
    public modalCtrl: ModalController,
    public navParams: NavParams
  ) {
    this.film = this.navParams.get('film');
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }
}
