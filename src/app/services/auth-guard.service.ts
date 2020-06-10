import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ActivatedRouteSnapshot, CanActivate, Router, UrlTree } from '@angular/router';
import * as Constants from '../constants';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(
    private storage: Storage,
    private router: Router
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot): Promise<boolean | UrlTree> {
    return new Promise<boolean | UrlTree>((resolve) => {
      this.storage.get(Constants.Storage.IS_USER_LOGGED_IN).then((value) => {
        if (!value) {
          this.router.navigate(['login'], {skipLocationChange: true});
          resolve(false);
        } else {
          resolve(true);
        }
      });
    });
  }
}
