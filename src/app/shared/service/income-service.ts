import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { inject } from '@angular/core/primitives/di';
import { fromAPI, Income, IncomeAPI, toAPI } from '../models/income';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IncomeService {
  private http = inject(HttpClient);
  private baseUrl: string = 'http://localhost/8000/api/v1/incomes';
  private _incomes = signal<Income[]>([]);
  readonly incomes = this._incomes.asReadonly();

  get_incomes(periodId: number): void {
    this.http
      .get<IncomeAPI[]>(`${this.baseUrl}/period/${periodId}`)
      .pipe(
        map((responseList) => {
          let incomeList: Income[] = [];
          for (let incomeAPI of responseList) {
            incomeList.push(fromAPI(incomeAPI));
          }
          return incomeList;
        })
      )
      .subscribe({
        next: (incomes) => {
          this._incomes.set(incomes);
        },
        error: (err) => {
          console.error('Could not fetch incomes', err);
        },
      });
  }

  add_income(income: Income): void {
    this.http.post<IncomeAPI>(this.baseUrl, toAPI(income));
    //TODO
  }
}

// getCategoryWithExpense(categoryId: number): void {
//   this.http.get<CategoryAPI>(`${this.baseUrl}/${categoryId}`).pipe(
//      map(api => fromAPI(api))
//   ).subscribe({
//     next: category => {

//       this.selectedCategory.set(category)
//     },
//     error: err => {
//       console.error('Could not fetch category', err)
//     }
//   });
// }
