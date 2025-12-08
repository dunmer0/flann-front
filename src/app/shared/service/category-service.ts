import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import {Category, CategoryAPI, CategoryWithExpenses, mapCategory} from '../models/category';
import { map, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  http = inject(HttpClient);
  baseUrl: string = 'http://localhost:8000/api/v1/categories';
  selectedCategory = signal<CategoryWithExpenses>({
    id: 0,
    name: '',
    anticipatedExpense: 0,
    actualExpense: 0,
    periodId: 0,
    expenses: [],
  });
  categories = signal<Category[]>([]);

  // get_categories(): void {
  //   this.http.get<CategoryAPI[]>(this.baseUrl).subscribe({
  //     next: (data) => {
  //       this.categories.set(data);
  //     },
  //     error: (error) => {
  //       console.error('Could not fetch categories', error);
  //     },
  //   });
  // }
  getCategories(): void{
    this.http.get<CategoryAPI[]>(this.baseUrl).pipe(
      map(apiList => apiList.map(api => mapCategory(api))
    )).subscribe({
      next: mappedList => {
        this.categories.set(mappedList);
      },
      error: error => {
        console.error('Could not fetch categories', error);
      }
    })
  }

  getCategoryWithExpense(categoryId: number): void {
    this.http.get<CategoryAPI>(`${this.baseUrl}/${categoryId}`).pipe(
       map(api => mapCategory(api))
    ).subscribe({
      next: category => {

        this.selectedCategory.set(category)
      },
      error: err => {
        console.error('Could not fetch category', err)
      }
    });
  }

  addCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(this.baseUrl, category).pipe(
      map((data) => ({
        id: data.id,
        name: data.name,
        anticipatedExpense: data.anticipatedExpense,
        actualExpense: 0,
        periodId: data.periodId,
      })),
      tap(() => this.getCategories())
    );
  }

  deleteCategory(categoryId: number): void {
    this.http.delete(`${this.baseUrl}/${categoryId}`);
  }
}
