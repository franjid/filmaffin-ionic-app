import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';

@Injectable()
export class FilmaffinLocalDbServiceProvider {
    db: SQLiteObject = null;

    constructor(public http: HttpClient) {
    }

    setDatabase(db: SQLiteObject) {
        if(this.db === null){
            this.db = db;
        }
    }

    createFavoriteFilmTable() {
        //this.db.executeSql('DROP TABLE favoriteFilm', []);
        let sql = 'CREATE TABLE IF NOT EXISTS ' +
                    'favoriteFilm(' +
                        'idFilm INTEGER PRIMARY KEY UNIQUE, ' +
                        'whenAdded INTEGER' +
                    ')';

        return this.db.executeSql(sql, []);
    }

    saveFavoriteFilm(idFilm: number) {
        let sql = 'INSERT INTO favoriteFilm(idFilm, whenAdded) VALUES(?, CURRENT_TIMESTAMP)';

        return this.db.executeSql(sql, [idFilm]);
    }

    deleteFavoriteFilm(idFilm: number) {
        let sql = 'DELETE FROM favoriteFilm WHERE idFilm = ?';

        return this.db.executeSql(sql, [idFilm]);
    }

    isFavoriteFilm(idFilm: number) {
        let sql = 'SELECT idFilm FROM favoriteFilm WHERE idFilm = ?';

        return this.db.executeSql(sql, [idFilm])
            .then((data)=>{
                return !!data.rows.length;
            })
    }

    getFavoriteFilms() {
        let sql = 'SELECT idFilm FROM favoriteFilm ORDER BY whenAdded DESC';

        return this.db.executeSql(sql, [])
            .then(response => {
                let idFilms = [];

                for (let index = 0; index < response.rows.length; index++) {
                    idFilms.push(response.rows.item(index).idFilm);
                }

                return Promise.resolve(idFilms);
            })
            .catch(error => Promise.reject(error));
    }
}
