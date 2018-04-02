import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';

@Injectable()
export class FilmaffinLocalDbServiceProvider {
    db: SQLiteObject = null;

    constructor(public http: HttpClient) {
    }

    setDatabase(db: SQLiteObject) {
        console.log('setDatabase');
        if(this.db === null){
            this.db = db;
        }
    }

    createFavoriteFilmTable(){
        let sql = 'CREATE TABLE IF NOT EXISTS ' +
                    'favoriteFilm(idFilm INTEGER PRIMARY KEY UNIQUE)';

        return this.db.executeSql(sql, []);
    }

    saveFavoriteFilm(idFilm: number) {
        let sql = 'INSERT INTO favoriteFilm(idFilm) VALUES(?)';

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
}
