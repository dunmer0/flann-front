import {Component, inject, OnChanges, OnInit, signal, SimpleChanges} from '@angular/core';
import {ExpenseService} from '../../shared/service/expense-service';
import {ExpenseAdd} from '../../shared/models/expense';
import {Field, form} from '@angular/forms/signals';
import {CategoryService} from '../../shared/service/category-service';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {PeriodService} from '../../shared/service/period-service';

@Component({
  selector: 'app-expense-form',
  imports: [
    Field
  ],
  templateUrl: './expense-form.html',
  styleUrl: './expense-form.css',
})
export class ExpenseForm  {
  expenseService = inject(ExpenseService);
  categoryService = inject(CategoryService);
  periodService = inject(PeriodService);
  router = inject(Router);
  expenseModel = signal<ExpenseAdd>({
    name: "",
    cost: NaN,
    date: "",
    categoryId: NaN
  })
  expenseForm = form(this.expenseModel);




  addExpense() {


    let expenseAdd: ExpenseAdd = {
      name: this.expenseModel().name,
      cost: this.expenseModel().cost,
      date: this.expenseModel().date,
      categoryId: this.categoryService.selectedCategory().id
    }
    this.expenseService.addExpense(expenseAdd)
    this.expenseModel.set({
      name:"",
      cost: NaN,
      date: "",
      categoryId: NaN
    })
    let periodId = this.periodService.selectedPeriod().id;
    this.periodService.getPeriod(periodId, true)

  }


}
