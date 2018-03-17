import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as Constants from '../../app/constants';

@Injectable()
export class FilmaffinServiceProvider {

  constructor(public http: HttpClient) {
  }

    getPopularFilms() {
        return this.http.get(Constants.FILMAFFIN_API_ENDPOINT + '/films/popular');
    }

    getFilm(idFilm) {
        return this.http.get(Constants.FILMAFFIN_API_ENDPOINT + '/films/' + idFilm);
    }
}
