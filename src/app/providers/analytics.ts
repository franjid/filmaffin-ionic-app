import { Injectable } from '@angular/core';
import { FirebaseAnalytics } from '@ionic-native/firebase-analytics/ngx';
import { Platform } from "@ionic/angular";
import { Storage } from "@ionic/storage";
import * as Constants from "../constants";

@Injectable()
export class AnalyticsProvider {
  constructor(
    private platform: Platform,
    private firebaseAnalytics: FirebaseAnalytics,
    private storage: Storage,
  ) { }

  trackView(screenName: string) {
    this.storage.get(Constants.Storage.NUM_VIEWS_BEFORE_SHOW_ADD).then((value) => {
      let views = 1;

      if (value) {
        views += value;
      }

      this.storage.set(Constants.Storage.NUM_VIEWS_BEFORE_SHOW_ADD, views);
    });

    this.platform.ready().then(() => {
      if (this.platform.is('cordova')) {
        this.firebaseAnalytics.setCurrentScreen(screenName);
      }
    });
  }

  async getViewsBeforeShowAd() {
    let totalViews;

    await this.storage.get(Constants.Storage.NUM_VIEWS_BEFORE_SHOW_ADD).then((value) => {
      totalViews = value;
    });

    return totalViews;
  }

  resetAdViews() {
    this.storage.set(Constants.Storage.NUM_VIEWS_BEFORE_SHOW_ADD, 0);
  }

  trackEvent(eventName: string, eventParams: any) {
    this.platform.ready().then(() => {
      if (this.platform.is('cordova')) {
        this.firebaseAnalytics.logEvent(eventName, eventParams);
      }
    });
  }
}
