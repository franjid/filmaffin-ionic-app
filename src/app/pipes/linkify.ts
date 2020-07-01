import { Pipe } from '@angular/core'

@Pipe({
  name: 'linkify'
})

export class LinkifyPipe {
  transform(string: string): string {
    return this.linkify(string);
  }

  private linkify(string: string): string {
    let replacedText;
    let replacePattern1;
    let replacePattern2;

    //URLs starting with http://, https://
    replacePattern1 = /(\b(https?):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
    replacedText = string.replace(replacePattern1, '<a href="$1" target="_blank">Link</a>');

    //URLs starting with "www." (without // before it, or it'd re-link the ones done above).
    replacePattern2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
    replacedText = replacedText.replace(replacePattern2, '$1<a href="http://$2" target="_blank">Link</a>');

    return replacedText;
  }
}
