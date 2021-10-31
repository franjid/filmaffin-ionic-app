import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PopularFilmsPage } from "../popular-films/popular-films";
import { FilmsByType } from "../films-by-type/films-by-type";
import { FilmsInTheatresPage } from "../films-in-theatres/films-in-theatres";
import { FilmDetailPage } from "../film-detail/film-detail";
import { FavoriteFilmsPage } from "../favorite-films/favorite-films";
import { FriendsFilmsPage } from "../friends-films/friends-films";
import { AuthGuardService } from "../../services/auth-guard.service";

const routes: Routes = [
  {
    path: 'popular',
    component: PopularFilmsPage,
  },
  {
    path: 'theatres',
    component: FilmsInTheatresPage,
  },
  {
    path: 'favorite',
    component: FavoriteFilmsPage,
  },
  {
    path: ':type/:name',
    component: FilmsByType,
  },
  {
    path: 'friends',
    component: FriendsFilmsPage,
    canActivate: [AuthGuardService]
  },
  { // Must be the last one as otherwise a path like /films/theatres will go into this route
    path: ':filmId',
    component: FilmDetailPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class FilmsPageRoutingModule {
}

