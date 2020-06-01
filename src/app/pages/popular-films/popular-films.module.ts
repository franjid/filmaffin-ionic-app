import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { PopularFilmsPage } from './popular-films';
import { PopularFilmsPageRoutingModule } from './popular-films-routing.module';

import { PipesModule } from '../../pipes/pipes.module';
import { FilmaffinServiceProvider } from '../../providers/filmaffin-service';
import { AppSharedComponentsModule } from '../../app-shared-components.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    PopularFilmsPageRoutingModule,
    PipesModule,
    AppSharedComponentsModule
  ],
  declarations: [
    PopularFilmsPage,
  ],
  providers: [FilmaffinServiceProvider]
})

export class PopularFilmsModule {
}
