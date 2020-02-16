import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(data: Array<any>, name: string): any {
    if (!name) { return data; }
    if (!data) { return []; }
    return data.filter( d => d.firstName.toLowerCase().indexOf(name.toLowerCase()) !== -1 );

  }

}
