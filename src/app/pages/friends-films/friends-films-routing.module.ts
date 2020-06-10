import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FriendsFilmsPage } from "./friends-films";

const routes: Routes = [
  {
    path: '',
    component: FriendsFilmsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class FriendsFilmsRoutingModule {
}
