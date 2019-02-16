import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FavoriteFilmsPage } from './favorite-films';

@NgModule({
  declarations: [
    FavoriteFilmsPage,
  ],
  imports: [
    IonicPageModule.forChild(FavoriteFilmsPage),
  ],
})
export class FavoriteFilmsPageModule {}
