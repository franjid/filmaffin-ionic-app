import { NgModule } from '@angular/core';
import { FilmListElementComponent } from './film-list-element/film-list-element.component';
import { PipesModule } from './pipes/pipes.module';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    PipesModule,
  ],
  declarations: [
    FilmListElementComponent
  ],
  providers: [],
  exports: [
    FilmListElementComponent,
  ]
})

export class AppSharedComponentsModule {
}
