import { NgModule } from '@angular/core';
import { TruncatePipe } from './truncate';
import { FilmImgPipe } from "./film-img";
import { LinkifyPipe } from './linkify';
import { RemoveSpacesPipe } from "./remove-spaces";

@NgModule({
  declarations: [TruncatePipe, FilmImgPipe, LinkifyPipe, RemoveSpacesPipe],
  imports: [],
  exports: [TruncatePipe, FilmImgPipe, LinkifyPipe, RemoveSpacesPipe],
})

export class PipesModule {
}
