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

  getFilmsByType(type: string, name: string, sortBy: string, numResults: number, offset: number) {
    return this.http.get(
      Constants.FILMAFFIN_API_ENDPOINT +
      '/films' +
      '?teamMemberType=' + type + '&teamMemberName=' + name +
      '&sort=' + sortBy + '&numResults=' + numResults + '&offset=' + offset
    );
  }

  getUserFriendsLastRatedFilms(userId: number, numResults: number, offset: number) {
    return this.http.get(
      Constants.FILMAFFIN_API_ENDPOINT + '/users/' + userId + '/friends/films' +
      '?numResults=' + numResults + '&offset=' + offset
    );
  }

  loginUser(username: string, password: string, appNotificationsToken: string|null) {
    return this.http.get(
      Constants.FILMAFFIN_API_ENDPOINT + '/users/login/filmaffinity' +
        '?user=' + username + '&password=' + password + '&appNotificationsToken=' + appNotificationsToken
    );
  }
}
