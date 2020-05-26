import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FavoriteFilmsPage } from "./favorite-films";

const routes: Routes = [
  {
    path: '',
    component: FavoriteFilmsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class FavoriteFilmsRoutingModule {
}
