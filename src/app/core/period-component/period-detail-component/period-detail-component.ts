import {Component, computed, inject} from '@angular/core';
import { PeriodService } from '../../../shared/service/period-service';
import {ActivatedRoute, NavigationEnd, Router, RouterLinkActive, RouterOutlet} from '@angular/router';
import {CategoryService} from '../../../shared/service/category-service';
import {DecimalPipe, NgClass} from '@angular/common';
import {ExpenseService} from '../../../shared/service/expense-service';

@Component({
  selector: 'app-period-detail-component',
  imports: [
    RouterOutlet,
    NgClass,
    DecimalPipe
  ],
  templateUrl: './period-detail-component.html',
  styleUrl: './period-detail-component.css',
})
export class PeriodDetailComponent {
  periodService = inject(PeriodService)
  categoryService = inject(CategoryService)
  expenseService = inject(ExpenseService)
  router = inject(Router);
  route = inject(ActivatedRoute);

  goToCategory(categoryId:number) {
    this.categoryService.getCategoryWithExpense(categoryId)
    this.expenseService.getExpensesByCategory(categoryId)
    this.router.navigate([`category/${categoryId}`], { relativeTo: this.route });
  }

  isActive(categoryId: number) {
    return this.router.url.includes(`category/${categoryId}`);
  }

  categories = computed(() => this.periodService.selectedPeriod().categories);



}
