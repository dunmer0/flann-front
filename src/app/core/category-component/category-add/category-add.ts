import {Component, inject, signal} from '@angular/core';
import {Category} from '../../../shared/models/category';
import {CategoryService} from '../../../shared/service/category-service';
import {PeriodService} from '../../../shared/service/period-service';
import {form} from '@angular/forms/signals';

@Component({
  selector: 'app-category-add',
  imports: [],
  templateUrl: './category-add.html',
  styleUrl: './category-add.css',
})
export class CategoryAdd {
  categoryService = inject(CategoryService);
  periodService = inject(PeriodService);
  categoryModel = signal<Category> ({
    id: NaN,
    name: '',
    anticipatedExpense: NaN,
    actualExpense: 0,
    periodId: NaN
  })
  categoryForm = form(this.categoryModel)



}
