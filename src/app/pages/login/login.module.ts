import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { LoginRoutingModule } from './login-routing.module';
import { LoginPage } from "./login";

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    LoginRoutingModule
  ],
  declarations: [
    LoginPage,
  ],
  providers: [],
})
export class LoginModule {
}
