import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'film-list-element',
  templateUrl: './film-list-element.component.html',
  styleUrls: ['./film-list-element.component.scss'],
})
export class FilmListElementComponent implements OnInit {
  @Input() film: [];
  @Input() userRating: number;

  constructor(
    public router: Router,
  ) {
  }

  ngOnInit() {
  }

  loadFilm(idFilm) {
    this.router.navigate(['films', idFilm]);
  }
}
