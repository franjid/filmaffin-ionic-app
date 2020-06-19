import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { PipesModule } from '../../pipes/pipes.module';
import { FilmaffinServiceProvider } from "../../providers/filmaffin-service";
import { FilmsInTheatresRoutingModule } from "./films-in-theatres-routing.module";
import { FilmsInTheatresPage } from "./films-in-theatres";

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    FilmsInTheatresRoutingModule,
    PipesModule
  ],
  declarations: [
    FilmsInTheatresPage,
  ],
  providers: []
})

export class FilmsInTheatresModule {
}
