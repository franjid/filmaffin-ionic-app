import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { FilmsInTheatresPage } from '../pages/films-in-theatres/films-in-theatres';
import { FavoriteFilmsPage } from '../pages/favorite-films/favorite-films';
import { FilmDetailPage } from '../pages/film-detail/film-detail';
import { LoginPage } from '../pages/login/login';
import { BigPosterModalPage } from '../pages/big-poster-modal/big-poster-modal';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Toast } from '@ionic-native/toast';
import { SQLite } from '@ionic-native/sqlite';
import { SocialSharing } from '@ionic-native/social-sharing';

import { HttpClientModule } from '@angular/common/http';
import { FilmaffinServiceProvider } from '../providers/filmaffin-service/filmaffin-service';

import { TruncatePipe } from './pipes/truncate';
import { FilmImgPipe } from './pipes/film-img';
import { FilmaffinLocalDbServiceProvider } from '../providers/filmaffin-local-db-service/filmaffin-local-db-service';

@NgModule({
  declarations: [
      MyApp,
      HomePage,
      FilmsInTheatresPage,
      FavoriteFilmsPage,
      FilmDetailPage,
      LoginPage,
      BigPosterModalPage,
      TruncatePipe,
      FilmImgPipe
  ],
  imports: [
      BrowserModule,
      HttpClientModule,
      IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
      MyApp,
      HomePage,
      FilmsInTheatresPage,
      FavoriteFilmsPage,
      FilmDetailPage,
      LoginPage,
      BigPosterModalPage
  ],
  providers: [
      StatusBar,
      SplashScreen,
      Toast,
      SQLite,
      SocialSharing,
      {provide: ErrorHandler, useClass: IonicErrorHandler},
      FilmaffinServiceProvider,
      FilmaffinLocalDbServiceProvider
  ]
})
export class AppModule {}
