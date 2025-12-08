import {inject, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Expense, ExpenseAdd, ExpenseAddApi, fromExpenseAddAPI, toExpenseAddApi} from '../models/expense';
import {map, tap} from 'rxjs';
import {PeriodService} from './period-service';

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  private http = inject(HttpClient)
  private url:string = 'http://localhost:8000/api/v1/expenses';
  private periodService = inject(PeriodService);

  expenses = signal<Expense[]>([])

  getExpensesByCategory(categoryId:number):void{
    this.http.get<Expense[]>(`${this.url}/category/${categoryId}`).subscribe({
      next: data =>{
        this.expenses.set(data);
      },
      error: error => {
        console.log(error);
      }
    })
  }

  addExpense( expense: ExpenseAdd):void{

    this.http.post<ExpenseAddApi>(`${this.url}`, toExpenseAddApi(expense)).pipe(
      map(data => fromExpenseAddAPI(data)),

    ).subscribe({
      next: data => {
        this.expenses.update(current => [...current, data] );
        this.periodService.getPeriod(this.periodService.selectedPeriod().id, true)
      },
      error: error => {
        console.log(error);
      }
    })
  }

  deleteExpense(id:number):void{
    this.http.delete(`${this.url}/${id}`).subscribe({
      next: () => {
        this.expenses.update(current => current.filter(item => item.id !== id));
        this.periodService.getPeriod(this.periodService.selectedPeriod().id, true)
      },
      error: error => {
        console.log(error);
      }
    })
  }
}
