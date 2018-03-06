import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {FilmDetailPage} from "../film-detail/film-detail";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

    loadFilm(idFilm) {
        console.log('Loading film page for: ' + idFilm);
        this.navCtrl.push(FilmDetailPage, {
          idFilm: idFilm
        });
        return;
    }
}
