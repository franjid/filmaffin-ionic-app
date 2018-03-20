import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as Constants from '../../app/constants';

@Injectable()
export class FilmaffinServiceProvider {

  constructor(public http: HttpClient) {
  }

    getPopularFilms(numResults: number, offset: number) {
        return this.http.get(
            Constants.FILMAFFIN_API_ENDPOINT +
            '/films/popular?numResults=' + numResults + '&offset=' + offset
        );
    }

    getFilmsInTheatres() {
        return this.http.get(Constants.FILMAFFIN_API_ENDPOINT + '/films/in-theatres');
    }

    getFilm(idFilm: number) {
        return this.http.get(Constants.FILMAFFIN_API_ENDPOINT + '/films/' + idFilm);
    }

    searchFilm(title: string) {
        return this.http.get(Constants.FILMAFFIN_API_ENDPOINT + '/films?title=' + title);
    }
}
