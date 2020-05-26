import { NgModule } from '@angular/core';
import { BigPosterModalPage } from './big-poster-modal';
import { IonicModule } from "@ionic/angular";
import { PipesModule } from "../../pipes/pipes.module";

@NgModule({
  imports: [
    IonicModule,
    PipesModule
  ],
  declarations: [
    BigPosterModalPage,
  ],
})

export class BigPosterModalPageModule {
}
