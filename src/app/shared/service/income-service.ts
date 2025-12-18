import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { inject } from '@angular/core/primitives/di';
import { fromAPI, Income, IncomeAPI, IncomeUpdate, toAPI } from '../models/income';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IncomeService {
  private http = inject(HttpClient);
  private baseUrl: string = 'http://localhost/8000/api/v1/incomes';
  private _incomes = signal<Income[]>([]);
  private _selectedIncome = signal<Income>({
    id: NaN,
    name: '',
    amount: NaN,
    date: '',
    periodId: NaN,
  });
  readonly incomes = this._incomes.asReadonly();
  readonly selectedIncome = this._selectedIncome.asReadonly();

  getIncomes(periodId: number): void {
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

  addIncome(income: Income): void {
    this.http
      .post<IncomeAPI>(this.baseUrl, toAPI(income))
      .pipe(map((incomeAPI) => fromAPI(incomeAPI)))
      .subscribe({
        next: (income) => this._incomes.update((current) => [...current, income]),
        error: (err) => console.error('Could not add income', err),
      });
  }

  getIncome(incomeId: number): void {
    this.http
      .get<IncomeAPI>(`${this.baseUrl}/${incomeId}`)
      .pipe(map((incomeAPI) => fromAPI(incomeAPI)))
      .subscribe({
        next: (income) => this._selectedIncome.set(income),
        error: (err) => console.error(`Could not fetch income with id: ${incomeId}`, err),
      });
  }

  updateIncome(updateIncome: IncomeUpdate) {
    this.http
      .put<IncomeAPI>(this.baseUrl, updateIncome)
      .pipe(map((incomeAPI) => fromAPI(incomeAPI)))
      .subscribe({
        next: (income) => this._selectedIncome.update(() => income),
        error: (err) => console.error(`Could not update income with id:${updateIncome.id}`, err),
      });
  }

  deleteIncome(incomeId: number) {
    this.http.delete(`${this.baseUrl}/${incomeId}`).subscribe();
  }
}
