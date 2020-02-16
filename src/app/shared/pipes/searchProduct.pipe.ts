import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'searchProduct'
})
export class SearchProductPipe implements PipeTransform {

  transform(arrProducts: Array<any>, value: string): any {
    if (!value) { return arrProducts;  }
    if (!arrProducts) { return []; }
    return arrProducts.filter(d => d.name.toLowerCase().indexOf(value.toLowerCase()) !== -1);
    
  }

}
