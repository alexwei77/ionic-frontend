import { Injectable, Pipe } from '@angular/core';

/*
  Generated class for the FilterPipe pipe.

  See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
  Angular 2 Pipes.
*/
@Pipe({
  name: 'filter'
})
@Injectable()
export class FilterPipe {
  /*
    Takes a value and makes it lowercase.
   */
  transform(items: any[], filter: Object): any {
    if (!items || !filter) {
      return items;
    }
    // filter items array, items which match and return true will be kept, false will be filtered out
    return items.filter(item => item.title.indexOf(filter) !== -1);
  }
}
