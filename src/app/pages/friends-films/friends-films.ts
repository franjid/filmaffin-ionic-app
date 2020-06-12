import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { FilmaffinServiceProvider } from "../../providers/filmaffin-service";
import * as Constants from '../../constants';
import { LoadingController, ToastController } from "@ionic/angular";

@Component({
  selector: 'page-friends-films',
  templateUrl: 'friends-films.html',
  styleUrls: ['./friends-films.scss'],
})

export class FriendsFilmsPage {
  userLoggedIn = false;
  friendsSynced = false;
  filmsGroupedByDateUser;

  constructor(
    private storage: Storage,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private filmaffinService: FilmaffinServiceProvider
  ) {
  }

  ngOnInit() {
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

        this.loadUserFriendsLastRatedFilms(userId);
      }
    });
  }

  async loadUserFriendsLastRatedFilms(userId: number) {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando...'
    });
    await loading.present();

    this.filmaffinService.getUserFriendsLastRatedFilms(userId, 30, 0)
      .subscribe(
        (data: Array<any>) => {
          this.filmsGroupedByDateUser = this.getFilmsGroupedByDateUserOptimized(data);
          loading.dismiss();
        },
        async (error) => {
          loading.dismiss();

          const toast = await this.toastCtrl.create({
            message: 'No se pueden cargar las películas.' + ' \n' + 'Revisa tu conexión a internet.',
            buttons: [
              {
                text: 'Ok',
                role: 'cancel',
                handler: () => {
                  toast.dismiss();
                  this.loadUserFriendsLastRatedFilms(userId);
                }
              }
            ]
          });
          await toast.present();

          console.error(error);
        }
      );
  }

  private getFilmsGroupedByDateUserOptimized(data) {
    let filmsGroupedByDate = [];
    let filmsGroupedByUser = [];
    let filmsGroupedByDateUserOptimized = [];

    let j = -1;
    let previousDateRated = 0;

    data.forEach(function (filmData) {
      if (filmData.dateRated != previousDateRated) {
        j++;

        filmsGroupedByDate[j] = {
          dateRated: filmData.dateRated,
          data: [filmData]
        };
      } else {
        filmsGroupedByDate[j].data.push(filmData);
      }

      previousDateRated = filmData.dateRated;
    });


    filmsGroupedByDate.forEach(function (filmsFormattedData, i) {
      filmsGroupedByUser[i] = {
        dateRated: filmsFormattedData.dateRated,
        users: []
      };

      (filmsFormattedData.data).forEach(function (filmsFormattedDataData, j, array) {
        if (!filmsGroupedByUser[i].users[filmsFormattedDataData.user.userId]) {
          filmsGroupedByUser[i].users[filmsFormattedDataData.user.userId] = [];
          filmsGroupedByUser[i].users[filmsFormattedDataData.user.userId].username = filmsFormattedDataData.user.userName;
        }

        filmsGroupedByUser[i].users[filmsFormattedDataData.user.userId].push(filmsFormattedDataData);
      });
    });

    filmsGroupedByUser.forEach(function (groupedByDate) {
      let users = [];

      (groupedByDate.users).forEach(function (groupedByUser) {
        users.push(groupedByUser);
      });

      filmsGroupedByDateUserOptimized.push({
        dateRated: groupedByDate.dateRated,
        users: users
      });
    });

    return filmsGroupedByDateUserOptimized;
  }
}
