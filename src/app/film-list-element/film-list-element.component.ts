import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Film } from "../interfaces/film";
import { AdmobService } from "../services/admob.service";
import { AnalyticsProvider } from "../providers/analytics";
import * as Constants from '../constants';

@Component({
  selector: 'film-list-element',
  templateUrl: './film-list-element.component.html',
  styleUrls: ['./film-list-element.component.scss'],
})
export class FilmListElementComponent implements OnInit {
  @Input() film: Film;
  @Input() userRating: number;

  constructor(
    public router: Router,
    private admobService: AdmobService,
    private analytics: AnalyticsProvider,
  ) {
  }

  ngOnInit() {
  }

  async loadFilm(idFilm) {
    const route = ['films', idFilm];
    const numViews = await this.analytics.getViewsBeforeShowAd();

    if (numViews >= Constants.NUM_VIEWS_TO_SHOW_ADD) {
      this.analytics.resetAdViews();
      this.admobService.showInterstitial(route);
    } else {
      this.router.navigate(route);
    }
  }
}
