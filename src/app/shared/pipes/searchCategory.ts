import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchCategory'
})
export class SearchCategoryPipe implements PipeTransform {

  transform(arrCategory: Array<any>, value: string): any {
    if (!value) { return arrCategory;  }
    if (!arrCategory) { return []; }
    return arrCategory.filter(d => d.nameCategory.toLowerCase().indexOf(value.toLowerCase()) !== -1);
    
  }

}
