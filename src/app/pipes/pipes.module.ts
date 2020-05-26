import { NgModule } from '@angular/core';
import { TruncatePipe } from './truncate';
import { FilmImgPipe } from "./film-img";

@NgModule({
  declarations: [TruncatePipe, FilmImgPipe],
  imports: [],
  exports: [TruncatePipe, FilmImgPipe],
})

export class PipesModule {
}
