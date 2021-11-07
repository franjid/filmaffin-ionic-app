import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { AdMobFree, AdMobFreeBannerConfig, AdMobFreeInterstitialConfig } from '@ionic-native/admob-free/ngx';
import { Router } from "@angular/router";
import * as Constants from "../constants";
import { Storage } from "@ionic/storage";
import { AnalyticsProvider } from "../providers/analytics";

@Injectable({
  providedIn: 'root'
})

export class AdmobService {
  bannerConfig: AdMobFreeBannerConfig = {
    // isTesting: true,
    autoShow: true,
    id: "ca-app-pub-6110433810592970/1728206641"
  };

  interstitialConfig: AdMobFreeInterstitialConfig = {
    // isTesting: true,
    autoShow: false,
    id: "ca-app-pub-6110433810592970/5284308271"
  };

  constructor(
    public platform: Platform,
    private admobFree: AdMobFree,
    public router: Router,
    private storage: Storage,
    private analytics: AnalyticsProvider,
  ) {
    platform.ready().then(() => {
      if (platform.is('cordova')) {
        this.admobFree.banner.config(this.bannerConfig);

        this.admobFree.interstitial.config(this.interstitialConfig);
        this.prepareInterstitial();
      }
    });
  }

  showBanner() {
    if (this.platform.is('cordova')) {
      this.admobFree.banner.prepare().then((v) => {
      }).catch(e =>
        console.log('Error loading Banner', e)
      );
    }
  }

  hideBanner() {
    if (this.platform.is('cordova')) {
      this.admobFree.banner.remove().then(() => {
      }).catch(e =>
        console.log('Error removing Banner', e)
      );
    }
  }

  prepareInterstitial() {
    if (this.platform.is('cordova')) {
      this.admobFree.interstitial.prepare().then(() => {
        console.log('Interstitial prepared');
      }).catch(e =>
        console.log('Error loading Interstitial: ', e)
      );
    }
  }

  showInterstitial(route) {
    if (this.platform.is('cordova')) {
      this.admobFree.interstitial.isReady().then(() => {
        this.admobFree.interstitial.show().then(() => {
          this.storage.set(Constants.Storage.INTERSTITIAL_AD_SHOWED, true);
          this.analytics.trackView('ad_interstitial');
          this.router.navigate(route);
        })
          .catch(e => {
            console.log('Error showing Interstitial', e);
            this.router.navigate(route);
          });
      })
        .catch(e => console.log('Error loading Interstitial', e));
    }
  }
}
