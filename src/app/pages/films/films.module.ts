import { NgModule } from '@angular/core';

import { FilmsPage } from './films';
import { FilmsPageRoutingModule } from './films-routing.module';
import { FilmsByTypePageModule } from '../films-by-type/films-by-type.module';
import { PopularFilmsModule } from "../popular-films/popular-films.module";
import { FilmsInTheatresModule } from "../films-in-theatres/films-in-theatres.module";
import { FavoriteFilmsModule } from "../favorite-films/favorite-films.module";
import { FriendsFilmsModule } from "../friends-films/friends-films.module";
import { FilmDetailModule } from "../film-detail/film-detail.module";

@NgModule({
  imports: [
    FilmsPageRoutingModule,
    FilmsByTypePageModule,
    PopularFilmsModule,
    FilmsInTheatresModule,
    FavoriteFilmsModule,
    FriendsFilmsModule,
    FilmDetailModule,
  ],
  declarations: [
    FilmsPage,
  ]
})

export class FilmsModule {
}
