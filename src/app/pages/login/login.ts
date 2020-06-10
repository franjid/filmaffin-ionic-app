import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';

import { UserLogin } from '../../interfaces/user-login';
import { FilmaffinServiceProvider } from "../../providers/filmaffin-service";
import * as Constants from '../../constants';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  styleUrls: ['./login.scss'],
})

export class LoginPage {
  login: UserLogin = {username: '', password: ''};
  formSubmitted: boolean = false;
  isTryingToLogin: boolean = false;
  errorLogin: boolean = false;

  constructor(
    private filmaffinService: FilmaffinServiceProvider,
    private storage: Storage,
    private router: Router
  ) {
  }

  ionViewWillEnter() {
    this.storage.get(Constants.Storage.IS_USER_LOGGED_IN).then((value) => {
      if (value === true) {
        console.log('User logged in');
        this.router.navigate(['films/friends']);
      }
    });
  }

  onLogin(form: NgForm) {
    this.formSubmitted = true;

    if (form.valid) {
      this.errorLogin = false;
      this.isTryingToLogin = true;
      console.log(this.login.username);
      console.log(this.login.password);

      this.filmaffinService.loginUser(this.login.username, this.login.password)
      // this.filmaffinService.getPopularFilms(1, 0)
        .subscribe(
          (data) => {
            console.info('SUCCESS!');
            console.log(data);

            this.storage.set(Constants.Storage.IS_USER_LOGGED_IN, true).then(() => {
              this.router.navigate(['films/friends'], {skipLocationChange: true});
            })
          },
          (error) => {
            console.info('ERROR!');
            console.error(error);

            this.formSubmitted = false;
            this.isTryingToLogin = false;
            this.errorLogin = true;
          }
        );
    }
  }
}
