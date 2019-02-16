import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SQLite } from '@ionic-native/sqlite';

import { HomePage } from '../pages/home/home';
import { FilmsInTheatresPage } from '../pages/films-in-theatres/films-in-theatres';
import { FavoriteFilmsPage } from '../pages/favorite-films/favorite-films';
import { LoginPage } from '../pages/login/login';

import { FilmaffinLocalDbServiceProvider } from '../providers/filmaffin-local-db-service/filmaffin-local-db-service';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;
  activePage: any;

  pages: Array<{title: string, component: any, icon: string}>;

  constructor(
      public platform: Platform,
      public statusBar: StatusBar,
      public splashScreen: SplashScreen,
      public sqlite: SQLite,
      public filmaffinLocalDb: FilmaffinLocalDbServiceProvider
  ) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
        { title: 'Películas populares', component: HomePage, icon: 'eye' },
        { title: 'Películas en cartelera', component: FilmsInTheatresPage, icon: 'film' },
        { title: 'Películas favoritas/Para ver', component: FavoriteFilmsPage, icon: 'star' }
    ];

    this.activePage = this.pages[0];
  }

  initializeApp() {
    this.platform.ready().then(() => {
        // Okay, so the platform is ready and our plugins are available.
        // Here you can do any higher level native things you might need.
        this.statusBar.styleDefault();
        this.createDatabase();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
    this.activePage = page;
  }

  isPageActive(page) {
    if (page == this.activePage) {
      return 'primary';
    }

    return;
  }

    private createDatabase(){
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
            .catch(error =>{
                console.error(error);
            });
    }
}
