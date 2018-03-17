import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class FilmaffinServiceProvider {

  constructor(public http: HttpClient) {
  }

    getPopularFilms() {
        return this.http.get('http://localhost:8000/films/popular');
    }
}
