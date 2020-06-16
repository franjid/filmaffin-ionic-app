import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';

import { UserLogin } from '../../interfaces/user-login';
import { FilmaffinServiceProvider } from "../../providers/filmaffin-service";
import * as Constants from '../../constants';

interface LoginResponse {
  userId: number,
  userName: string
}

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
    this.storage.get(Constants.Storage.ID_USER_LOGGED_IN).then((value) => {
      if (value) {
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

      this.storage.get(Constants.Storage.APP_NOTIFICATIONS_TOKEN).then((appNotificationsToken) => {
        this.filmaffinService.loginUser(this.login.username, this.login.password, appNotificationsToken)
          .subscribe(
            (data: LoginResponse) => {
              this.storage.set(Constants.Storage.ID_USER_LOGGED_IN, data.userId).then(() => {
                this.formSubmitted = false;
                this.isTryingToLogin = false;

                this.router.navigate(['films/friends'], {skipLocationChange: true});
              })
            },
            (error) => {
              console.error(error);

              this.formSubmitted = false;
              this.isTryingToLogin = false;
              this.errorLogin = true;
            }
          );
      });
    }
  }
}
