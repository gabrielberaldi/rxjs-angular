import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'firstValue'
})
export class FirstValuePipe implements PipeTransform {

  transform(authors: string[]): string {
    if(authors && authors.length) {
      return authors[0];
    }

    return '';
  }

}
