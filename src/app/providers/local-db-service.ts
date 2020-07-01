import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { browserLocalDb } from './browser-local-db-service';
import { environment } from '../../environments/environment';

declare var window: any;
const DB_NAME = 'data_filmaffin.db';

@Injectable()

export class LocalDbServiceProvider {
  public ready: Promise<any>;
  db: any;

  constructor(
    private platform: Platform,
    private sqlite: SQLite,
  ) {
    this.ready = new Promise((resolve) => {
      this.getDb().then(result => {
        resolve(result);
      });
    });
  }

  public async getDb(): Promise<any> {
    return new Promise((resolve) => {
      if (this.db) {
        resolve(this.db);
      } else {
        this.setDb().then(() => {
          resolve(this.db);
        });
      }
    });
  }

  private async setDb(): Promise<any> {
    return new Promise((resolve) => {
      this.platform.ready().then(() => {
        if (this.platform.is('cordova')) {
          this.sqlite.create({
            name: DB_NAME,
            location: 'default'
          }).then((db: SQLiteObject) => {
            this.db = db;
            resolve(db);
          });

        } else {
          const db = window.openDatabase(DB_NAME, '1.0', 'DEV', 5 * 1024 * 1024);
          this.db = browserLocalDb(db);
          resolve(this.db);
        }
      });
    });
  }
}
