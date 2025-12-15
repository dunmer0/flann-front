import { Component, inject, OnInit, signal } from '@angular/core';
import { Category } from '../../../shared/models/category';
import { CategoryService } from '../../../shared/service/category-service';
import { PeriodService } from '../../../shared/service/period-service';
import { Field, form } from '@angular/forms/signals';
import { Location } from '@angular/common';
import { CategoryNameService } from '../../../shared/service/category-name-service';

@Component({
  selector: 'app-category-add',
  imports: [Field],
  templateUrl: './category-add.html',
  styleUrl: './category-add.css',
})
export class CategoryAdd implements OnInit {
  categoryService = inject(CategoryService);
  periodService = inject(PeriodService);
  categoryNameService = inject(CategoryNameService);
  location = inject(Location);
  categoryModel = signal<Category>({
    id: NaN,
    name: '',
    anticipatedExpense: NaN,
    actualExpense: 0,
    periodId: NaN,
  });
  categoryForm = form(this.categoryModel);

  addCategory() {
    let categoryToAdd = {
      id: NaN,
      name: this.categoryModel().name,
      anticipatedExpense: this.categoryModel().anticipatedExpense,
      actualExpense: 0,
      periodId: this.periodService.selectedPeriod().id,
    };
    this.categoryService.addCategory(categoryToAdd).subscribe(() => {
      this.location.back();
    });
  }

  ngOnInit(): void {
    this.categoryNameService.getCategoryNames();
  }
}
// addPeriod() {
//   let periodToAdd = {
//     start: this.periodModel().start,
//     end: this.periodModel().end,
//   };
//   this.periodService.addPeriod(periodToAdd).subscribe(() => {
//     this.location.back();
//   });
// }
