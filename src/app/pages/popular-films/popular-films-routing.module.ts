import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PopularFilmsPage } from './popular-films';

const routes: Routes = [
  {
    path: '',
    component: PopularFilmsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class PopularFilmsPageRoutingModule {
}
