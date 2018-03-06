import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { FilmsInTheatresPage } from '../pages/films-in-theatres/films-in-theatres';
import { FilmDetailPage } from '../pages/film-detail/film-detail';
import { LoginPage } from '../pages/login/login';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
      MyApp,
      HomePage,
      FilmsInTheatresPage,
      FilmDetailPage,
      LoginPage
  ],
  imports: [
      BrowserModule,
      IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
      MyApp,
      HomePage,
      FilmsInTheatresPage,
      FilmDetailPage,
      LoginPage
  ],
  providers: [
      StatusBar,
      SplashScreen,
      {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
