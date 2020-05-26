import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { SQLite } from "@ionic-native/sqlite/ngx";
import { FilmaffinLocalDbServiceProvider } from "../../providers/filmaffin-local-db-service";
import { FavoriteFilmsPage } from "./favorite-films";
import { FavoriteFilmsRoutingModule } from "./favorite-films-routing.module";
import { PipesModule } from "../../pipes/pipes.module";

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    FavoriteFilmsRoutingModule,
    PipesModule
  ],
  declarations: [
    FavoriteFilmsPage
  ],
  providers: [
    SQLite,
    FilmaffinLocalDbServiceProvider
  ]
})
export class FavoriteFilmsModule {
}
