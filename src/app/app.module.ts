import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { FilmsInTheatresPage } from '../pages/films-in-theatres/films-in-theatres';
import { FilmDetailPage } from '../pages/film-detail/film-detail';
import { LoginPage } from '../pages/login/login';
import { BigPosterModalPage } from '../pages/big-poster-modal/big-poster-modal';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Toast } from '@ionic-native/toast';

import { HttpClientModule } from '@angular/common/http';
import { FilmaffinServiceProvider } from '../providers/filmaffin-service/filmaffin-service';

import { TruncatePipe } from './pipes/truncate';

@NgModule({
  declarations: [
      MyApp,
      HomePage,
      FilmsInTheatresPage,
      FilmDetailPage,
      LoginPage,
      BigPosterModalPage,
      TruncatePipe
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
      FilmDetailPage,
      LoginPage,
      BigPosterModalPage
  ],
  providers: [
      StatusBar,
      SplashScreen,
      Toast,
      {provide: ErrorHandler, useClass: IonicErrorHandler},
      FilmaffinServiceProvider
  ]
})
export class AppModule {}
