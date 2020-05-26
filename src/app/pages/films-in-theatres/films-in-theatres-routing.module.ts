import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FilmsInTheatresPage } from "./films-in-theatres";

const routes: Routes = [
  {
    path: '',
    component: FilmsInTheatresPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class FilmsInTheatresRoutingModule {
}
