import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hryvnia'
})
export class HryvniaPipe implements PipeTransform {

  transform(value: number, currency: string): any {
    if (!currency) { return value + ' ₴'; }
    if (!value) { return null; }
    if (currency === '$') {
      return value * 25 + ' ₴';
    }
  }

}
