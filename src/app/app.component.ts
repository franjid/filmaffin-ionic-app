import { Component } from '@angular/core';

import { MenuController, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { Router } from "@angular/router";
import { SQLite } from "@ionic-native/sqlite/ngx";
import { FilmaffinLocalDbServiceProvider } from "./providers/filmaffin-local-db-service";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  appPages = [
    {
      title: 'Películas populares',
      url: '/films/popular',
      icon: 'eye'
    },
    {
      title: 'Películas en cartelera',
      url: '/films/theatres',
      icon: 'film'
    },
    {
      title: 'Películas favoritas/Para ver',
      url: '/films/favorite',
      icon: 'star'
    },
  ];
  dark = false;

  constructor(
    private menu: MenuController,
    private platform: Platform,
    private router: Router,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private filmaffinLocalDb: FilmaffinLocalDbServiceProvider,
    private sqlite: SQLite
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.createDatabase();
    });
  }

  private createDatabase() {
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
      .then((db) => {
        this.filmaffinLocalDb.setDatabase(db);
        return this.filmaffinLocalDb.createFavoriteFilmTable();
      })
      .then(() => {
        this.splashScreen.hide();
      })
      .catch(error => {
        console.error(error);
      });
  }
}
