import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
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

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    IonicModule.forRoot(),
  ],
  declarations: [AppComponent],
  providers: [
    SplashScreen,
    StatusBar,
    SQLite,
    LocalDbServiceProvider,
    FilmaffinLocalDbServiceProvider
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
