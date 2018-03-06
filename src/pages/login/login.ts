import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { NavController } from 'ionic-angular';


@Component({
  selector: 'page-user',
  templateUrl: 'login.html'
})
export class LoginPage {
  login: {username?: string, password?: string} = {};
  submitted = false;

  constructor(public navCtrl: NavController) {}

  onLogin(form: NgForm) {
    this.submitted = true;

    if (form.valid) {
      //this.userData.login(this.login.username);
      //this.navCtrl.push(TabsPage);
    }
  }
}
