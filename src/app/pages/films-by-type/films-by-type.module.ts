import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FilmsByTypePageRoutingModule } from './films-by-type-routing.module';

import { FilmsByType } from './films-by-type';
import { PipesModule } from "../../pipes/pipes.module";
import { AppSharedComponentsModule } from "../../app-shared-components.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FilmsByTypePageRoutingModule,
    PipesModule,
    AppSharedComponentsModule
  ],
  declarations: [FilmsByType]
})
export class FilmsByTypePageModule {}
