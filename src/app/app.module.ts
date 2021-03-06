import { HttpClientModule } from '@angular/common/http';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { IonicModule } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { FilmaffinLocalDbServiceProvider } from './providers/filmaffin-local-db-service';
import { LocalDbServiceProvider } from './providers/local-db-service';
import { SQLite } from '@ionic-native/sqlite/ngx';
import { IonicStorageModule } from '@ionic/storage';
import { FCM } from '@ionic-native/fcm/ngx';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';

import es from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
import { FirebaseAnalytics } from "@ionic-native/firebase-analytics/ngx";
import { FirebaseAnalyticsProvider } from "./providers/firebase-analytics";
import { FilmaffinServiceProvider } from "./providers/filmaffin-service";

registerLocaleData(es);

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot()
  ],
  declarations: [
    AppComponent,
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'es-*'
    },
    SplashScreen,
    StatusBar,
    SQLite,
    FCM,
    ScreenOrientation,
    FirebaseAnalyticsProvider,
    FirebaseAnalytics,
    FilmaffinServiceProvider,
    LocalDbServiceProvider,
    FilmaffinLocalDbServiceProvider
  ],
  bootstrap: [AppComponent],
})

export class AppModule {
}
