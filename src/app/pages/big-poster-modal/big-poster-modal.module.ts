import { NgModule } from '@angular/core';
import { BigPosterModalPage } from './big-poster-modal';
import { IonicModule } from "@ionic/angular";
import { PipesModule } from "../../pipes/pipes.module";
import { PinchZoomModule } from 'ngx-pinch-zoom';

@NgModule({
  imports: [
    IonicModule,
    PipesModule,
    PinchZoomModule
  ],
  declarations: [
    BigPosterModalPage,
  ],
})

export class BigPosterModalPageModule {
}
