import { Pipe } from '@angular/core'

@Pipe({
  name: 'removeSpaces'
})

export class RemoveSpacesPipe {
  transform(string: string): string {
    return string.replace(/\s  +/gim, ' ');
  }
}
