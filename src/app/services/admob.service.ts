import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { AdMob } from '@admob-plus/ionic/ngx';
import { Router } from "@angular/router";
import * as Constants from "../constants";
import { Storage } from "@ionic/storage";
import { AnalyticsProvider } from "../providers/analytics";

@Injectable({
  providedIn: 'root'
})

export class AdmobService {
  banner;
  interstitial;

  constructor(
    public platform: Platform,
    private admob: AdMob,
    public router: Router,
    private storage: Storage,
    private analytics: AnalyticsProvider,
  ) {
    this.platform.ready().then(async () => {
      if (this.platform.is('cordova')) {
        this.admob.start().then(() => {
          this.banner = new this.admob.BannerAd({
            // adUnitId: 'ca-app-pub-3940256099942544/6300978111', // testing
            adUnitId: 'ca-app-pub-6110433810592970/1728206641', // prod
          });

          this.interstitial = new this.admob.InterstitialAd({
            // adUnitId: 'ca-app-pub-3940256099942544/1033173712', // testing
            adUnitId: 'ca-app-pub-6110433810592970/5284308271', // prod
          })

          this.hideBanner()
          this.prepareInterstitial()
        })
      }
    });
  }

  showBanner() {
    if (this.platform.is('cordova')) {
      this.banner.show().then(() => {
      })
    }
  }

  hideBanner() {
    if (this.platform.is('cordova')) {
      this.banner.hide().then(() => {
      }).catch(e => {
        console.log('Error hidding banner', e);
      });
    }
  }

  prepareInterstitial() {
    if (this.platform.is('cordova')) {
      this.interstitial.load().then(() => {
      }).catch(e => {
        console.log('Error showing Interstitial', e);
      });
    }
  }

  showInterstitial(route) {
    if (!this.platform.is('cordova')) {
      this.router.navigate(route);
      return;
    }

    this.interstitial.show().then(() => {
      this.storage.set(Constants.Storage.INTERSTITIAL_AD_SHOWED, true);
      this.analytics.trackView('ad_interstitial');
      this.router.navigate(route);
    })
      .catch(e => {
        console.log('Error showing Interstitial', e);
        this.router.navigate(route);
      });
  }
}
