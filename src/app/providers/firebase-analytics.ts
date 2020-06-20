import { Injectable } from '@angular/core';
import { FirebaseAnalytics } from '@ionic-native/firebase-analytics/ngx';
import { Platform } from "@ionic/angular";

@Injectable()
export class FirebaseAnalyticsProvider {
  constructor(
    private platform: Platform,
    private firebaseAnalytics: FirebaseAnalytics
  ) {
  }

  trackView(screenName: string) {
    this.platform.ready().then(() => {
      this.firebaseAnalytics.setCurrentScreen(screenName);
    });
  }

  trackEvent(eventName: string, eventParams: any) {
    this.platform.ready().then(() => {
      this.firebaseAnalytics.logEvent(eventName, eventParams);
    });
  }
}
