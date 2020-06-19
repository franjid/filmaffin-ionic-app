import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { FilmDetailPage } from './film-detail';
import { FilmDetailPageRoutingModule } from './film-detail-routing.module';

import { PipesModule } from '../../pipes/pipes.module';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { FilmImgPipe } from "../../pipes/film-img";
import { BigPosterModalPageModule } from "../big-poster-modal/big-poster-modal.module";
import { BigPosterModalPage } from "../big-poster-modal/big-poster-modal";
import { SQLite } from "@ionic-native/sqlite/ngx";

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    FilmDetailPageRoutingModule,
    PipesModule,
    BigPosterModalPageModule
  ],
  declarations: [
    FilmDetailPage
  ],
  providers: [
    SocialSharing,
    FilmImgPipe,
    SQLite
  ],
  entryComponents: [BigPosterModalPage],
})

export class FilmDetailModule {
}
