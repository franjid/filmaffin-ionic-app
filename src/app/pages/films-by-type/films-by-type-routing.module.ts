import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FilmsByType } from './films-by-type';

const routes: Routes = [
  {
    path: '',
    component: FilmsByType
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FilmsByTypePageRoutingModule {}
