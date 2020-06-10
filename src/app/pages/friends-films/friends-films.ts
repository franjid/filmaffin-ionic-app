import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { FilmaffinServiceProvider } from "../../providers/filmaffin-service";
import * as Constants from '../../constants';

@Component({
  selector: 'page-friends-films',
  templateUrl: 'friends-films.html',
  styleUrls: ['./friends-films.scss'],
})

export class FriendsFilmsPage {
  userLoggedIn = false;
  friendsSynced = false;

  constructor(
    private storage: Storage,
    private filmaffinService: FilmaffinServiceProvider,
    private route: Router
  ) {
  }

  ionViewWillEnter() {
    this.storage.get(Constants.Storage.IS_USER_LOGGED_IN).then((value) => {
      if (value === true) {
        console.log('User logged in');
        this.userLoggedIn = true;
        // At this point, user is logged. Then we can load friends last ratings
        // console.log('Load friends last ratings');
      }
    });

    this.storage.get(Constants.Storage.FRIENDS_SYNCED).then((value) => {
      if (value === true) {
        console.log('Friends synced');
        console.log('Load friends last ratings');

        this.friendsSynced = true;
      }
    });
  }
}
