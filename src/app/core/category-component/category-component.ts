import {Component, computed, inject, Signal} from '@angular/core';
import {CategoryService} from '../../shared/service/category-service';
import {ActivatedRoute, NavigationEnd, Router, RouterEvent} from '@angular/router';
import {ExpenseService} from '../../shared/service/expense-service';
import {DatePipe, DecimalPipe} from '@angular/common';
import {ExpenseForm} from '../expense-form/expense-form';
import {PeriodService} from '../../shared/service/period-service';
import {Category} from '../../shared/models/category';

@Component({
  selector: 'app-category-component',
  imports: [
    DatePipe,
    ExpenseForm,
    DecimalPipe
  ],
  templateUrl: './category-component.html',
  styleUrl: './category-component.css',
})
export class CategoryComponent {


  categoryService = inject(CategoryService);
  expenseService = inject(ExpenseService);
  periodService = inject(PeriodService);
  router = inject(Router);
  route = inject(ActivatedRoute);

  expenses = computed(() => this.expenseService.expenses());
  category = computed(()=> this.categoryService.selectedCategory())

  deleteExpense(id:number) {
    this.expenseService.deleteExpense(id)

  }

  // constructor() {
  //   this.router.events.subscribe((event) => {
  //     if (event instanceof NavigationEnd) {
  //       console.log(event.urlAfterRedirects.at(event.urlAfterRedirects.length-1))
  //
  //     }
  //   })
  // }
}
