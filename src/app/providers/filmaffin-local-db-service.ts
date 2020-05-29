import { Injectable } from '@angular/core';
import { LocalDbServiceProvider } from './local-db-service';

@Injectable()

export class FilmaffinLocalDbServiceProvider {
  db: any;

  constructor(
    private localDb: LocalDbServiceProvider
  ) {
    this.localDb.getDb().then((db) => {
      this.db = db;
    });
  }

  createFavoriteFilmTable() {
    // this.db.executeSql('DROP TABLE favoriteFilm', []);

    const sql = 'CREATE TABLE IF NOT EXISTS ' +
      'favoriteFilm(' +
      'idFilm INTEGER PRIMARY KEY UNIQUE, ' +
      'whenAdded INTEGER' +
      ')';

    return this.db.executeSql(sql, []);
  }

  saveFavoriteFilm(idFilm: number) {
    const sql = 'INSERT INTO favoriteFilm(idFilm, whenAdded) VALUES(?, ' + Date.now() + ')';

    return this.db.executeSql(sql, [idFilm]);
  }

  deleteFavoriteFilm(idFilm: number) {
    const sql = 'DELETE FROM favoriteFilm WHERE idFilm = ?';

    return this.db.executeSql(sql, [idFilm]);
  }

  isFavoriteFilm(idFilm: number) {
    const sql = 'SELECT idFilm FROM favoriteFilm WHERE idFilm = ?';

    return this.db.executeSql(sql, [idFilm])
      .then((data) => {
        return !!data.rows.length;
      });
  }

  getFavoriteFilms() {
    const sql = 'SELECT idFilm FROM favoriteFilm ORDER BY whenAdded DESC';

    return this.db.executeSql(sql, [])
      .then(response => {
        const idFilms = [];

        for (let index = 0; index < response.rows.length; index++) {
          idFilms.push(response.rows.item(index).idFilm);
        }

        return Promise.resolve(idFilms);
      })
      .catch(error => Promise.reject(error));
  }
}
