import { Pipe } from '@angular/core'

@Pipe({
    name: 'truncate'
})
export class TruncatePipe {
    transform (string: string, numWords: number) : string {
        let result = string.split(" ").splice(0, numWords).join(" ");

        if (result[result.length - 1] == ',') {
            result = result.slice(0, result.length - 1);
        }

        if (string.length > result.length) {
            result = result + '...';
        }

        return result;
    }
}