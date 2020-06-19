import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { FriendsFilmsRoutingModule } from './friends-films-routing.module';
import { PipesModule } from '../../pipes/pipes.module';
import { AppSharedComponentsModule } from '../../app-shared-components.module';
import { FriendsFilmsPage } from "./friends-films";

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    FriendsFilmsRoutingModule,
    PipesModule,
    AppSharedComponentsModule
  ],
  declarations: [
    FriendsFilmsPage,
  ],
  providers: [],
})
export class FriendsFilmsModule {
}
