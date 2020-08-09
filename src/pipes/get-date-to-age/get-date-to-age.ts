import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'getDateToAge',
})
export class GetDateToAgePipe implements PipeTransform {

  transform(value: Date, ...args) {
    if (value) {
      const nasc = new Date(value).getTime();
      const today = new Date().getTime();

      return Math.floor(Math.ceil(Math.abs(nasc - today) / (1000 * 3600 * 24)) / 365.25);
    }
  }
}
