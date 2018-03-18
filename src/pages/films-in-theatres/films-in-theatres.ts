import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FilmaffinServiceProvider } from '../../providers/filmaffin-service/filmaffin-service';
import * as Constants from '../../app/constants';
import {FilmDetailPage} from "../film-detail/film-detail";

@Component({
    selector: 'films-in-theatres',
    templateUrl: 'films-in-theatres.html'
})
export class FilmsInTheatresPage {
    films: any;
    posterImgHost = Constants.POSTER_IMG_HOST;

    constructor(public navCtrl: NavController, public FilmaffinService: FilmaffinServiceProvider) {
    }

    ionViewDidLoad() {
        this.FilmaffinService.getFilmsInTheatres()
            .subscribe(
                (data) => {
                    this.films = data;
                },
                (error) =>{
                    console.error(error);
                }
            );
    }

    loadFilm(idFilm) {
        this.FilmaffinService.getFilm(idFilm)
            .subscribe(
                (data) => {
                    this.navCtrl.push(FilmDetailPage, {
                        film: data[0]
                    });
                },
                (error) =>{
                    console.error(error);
                }
            );
    }
}
