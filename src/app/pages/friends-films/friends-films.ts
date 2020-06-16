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
    this.storage.get(Constants.Storage.ID_USER_LOGGED_IN).then((idUser) => {
      if (idUser) {
        this.userLoggedIn = true;

        this.storage.get(Constants.Storage.FRIENDS_SYNCED).then((value) => {
          if (value === true) {
            this.friendsSynced = true;
            this.loadUserFriendsLastRatedFilms(idUser);
          } else {
            /**
             * We call friends films and if we get some results it means
             * the notification failed, but we still can see the list
             *
             * We set FRIENDS_SYNCED key to true as, obviously, they've been synced :)
             */
            this.filmaffinService.getUserFriendsLastRatedFilms(idUser, 30, 0)
              .subscribe(
                (data: Array<any>) => {
                  this.storage.set(Constants.Storage.FRIENDS_SYNCED, true).then(() => {
                    this.friendsSynced = true;
                    this.filmsGroupedByDateUser = this.getFriendsFilmsGroupedByDateUser(data);
                  });
                }
              );
          }
        });
      }
    });
  }

  async loadUserFriendsLastRatedFilms(idUser: number) {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando...'
    });
    await loading.present();

    this.filmaffinService.getUserFriendsLastRatedFilms(idUser, 30, 0)
      .subscribe(
        (data: Array<any>) => {
          this.filmsGroupedByDateUser = this.getFriendsFilmsGroupedByDateUser(data);
          loading.dismiss();
        },
        async (error) => {
          loading.dismiss();

          const toast = await this.toastCtrl.create({
            message: 'No se pueden cargar las películas.' + ' \n' + 'Revisa tu conexión a internet.',
            duration: 5000,
            buttons: [
              {
                text: 'Ok',
                role: 'cancel',
                handler: () => {
                  toast.dismiss();
                  this.loadUserFriendsLastRatedFilms(idUser);
                }
              }
            ]
          });
          await toast.present();

          console.error(error);
        }
      );
  }

  private getFriendsFilmsGroupedByDateUser(data) {
    let filmsGroupedByDate = [];
    let filmsGroupedByUser = [];

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

      let userPositionMap = {};
      let userPosition = 0;

      (filmsFormattedData.data).forEach(function (filmsFormattedDataData) {
        if (userPositionMap[filmsFormattedDataData.user.userName] === undefined) {
          userPositionMap[filmsFormattedDataData.user.userName] = userPosition;
          filmsGroupedByUser[i].users[userPosition] = [];

          userPosition++;
        }

        let position = userPositionMap[filmsFormattedDataData.user.userName];

        filmsGroupedByUser[i].users[position].username = filmsFormattedDataData.user.userName;
        filmsGroupedByUser[i].users[position].push(filmsFormattedDataData);
      });
    });

    return filmsGroupedByUser;
  }
}
