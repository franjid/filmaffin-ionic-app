import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FavoriteFilmsPage } from './favorite-films';
import { FavoriteFilmsRoutingModule } from './favorite-films-routing.module';
import { PipesModule } from '../../pipes/pipes.module';
import { AppSharedComponentsModule } from '../../app-shared-components.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    FavoriteFilmsRoutingModule,
    PipesModule,
    AppSharedComponentsModule
  ],
  declarations: [
    FavoriteFilmsPage,
  ],
  providers: [],
})
export class FavoriteFilmsModule {
}
