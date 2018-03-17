import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {FilmDetailPage} from "../film-detail/film-detail";
import { FilmaffinServiceProvider } from '../../providers/filmaffin-service/filmaffin-service';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

    films: any;

    constructor(public navCtrl: NavController, public FilmaffinService: FilmaffinServiceProvider) {

  }

    ionViewDidLoad(){
        this.FilmaffinService.getPopularFilms()
            .subscribe(
                (data) => { // Success
                    this.films = data;
                },
                (error) =>{
                    console.error(error);
                }
            )
    }

    loadFilm(idFilm) {
        console.log('Loading film page for: ' + idFilm);
        this.navCtrl.push(FilmDetailPage, {
          idFilm: idFilm
        });
        return;
    }
}
