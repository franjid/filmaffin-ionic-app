import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FilmDetailPage } from './film-detail';

const routes: Routes = [
  {
    path: '',
    component: FilmDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class FilmDetailPageRoutingModule {
}
