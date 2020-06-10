import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as Constants from '../constants';

@Injectable()
export class FilmaffinServiceProvider {

  constructor(private http: HttpClient) {
  }

  getPopularFilms(numResults: number, offset: number) {
    return this.http.get(
      Constants.FILMAFFIN_API_ENDPOINT +
      '/films/popular?numResults=' + numResults + '&offset=' + offset
    );
  }

  getFilmsInTheatres(sortBy: string) {
    return this.http.get(Constants.FILMAFFIN_API_ENDPOINT + '/films/in-theatres?sort=' + sortBy);
  }

  getFilm(idFilm: number | string) {
    return this.http.get(Constants.FILMAFFIN_API_ENDPOINT + '/films/' + idFilm);
  }

  searchFilm(title: string) {
    return this.http.get(Constants.FILMAFFIN_API_ENDPOINT + '/films?title=' + title);
  }

  loginUser(username: string, password: string) {
    return this.http.get(Constants.FILMAFFIN_API_ENDPOINT + '/users/login/filmaffinity?user=' + username + '&password=' + password);
  }
}
