import { Pipe, PipeTransform } from '@angular/core';
import * as Constants from '../../app/constants';

@Pipe({
  name: 'filmImg',
})
export class FilmImgPipe implements PipeTransform {
  transform(posterImg: string, ...args) {
    return Constants.POSTER_IMG_HOST + posterImg + Constants.IMG_CACHE_SUFFIX;
  }
}
