import { NgModule } from '@angular/core';
import { TruncatePipe } from './truncate';
import { FilmImgPipe } from "./film-img";
import { LinkifyPipe } from './linkify';

@NgModule({
  declarations: [TruncatePipe, FilmImgPipe, LinkifyPipe],
  imports: [],
  exports: [TruncatePipe, FilmImgPipe, LinkifyPipe],
})

export class PipesModule {
}
