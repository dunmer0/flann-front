import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customDatePipe',
})
export class CustomDatePipePipe implements PipeTransform {
  transform(value: string): string {
    let valueArray = value.split('-');
    let [year, month, day] = valueArray;
    // switch(month){
    //   case "1":{
    //     switch(day){
    //       case "01": {return "Ianuarie 1"}
    //       case "16": {return "Ianuarie 2"}
    //     }
    //   }
    // }
    let stringMonth = (function (): string {
      switch (month) {
        case '01':
          return 'Ianuarie';
        case '02':
          return 'Februarie';
        case '03':
          return 'Martie';
        case '04':
          return 'Aprilie';
        case '05':
          return 'Mai';
        case '06':
          return 'Iunie';
        case '07':
          return 'Iulie';
        case '08':
          return 'August';
        case '09':
          return 'Septembrie';
        case '10':
          return 'Octombrie';
        case '11':
          return 'Noiembrie';
        case '12':
          return 'Decembrie';
      }
      return '';
    })();
    let stringDay = (function (): string {
      switch (day) {
        case '01':
          return '1';
        case '16':
          return '2';
      }
      return '';
    })();
    return stringMonth.concat(' ', stringDay);
  }
}
