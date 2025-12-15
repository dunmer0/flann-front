import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { CategoryName } from '../models/category-name';

@Injectable({
  providedIn: 'root',
})
export class CategoryNameService {
  http = inject(HttpClient);

  private baseURL = 'http://localhost:8000/api/v1/category-names';
  private _categoryNames = signal<CategoryName[]>([]);

  readonly categoryNames = this._categoryNames.asReadonly();

  getCategoryNames() {
    this.http.get<CategoryName[]>(this.baseURL).subscribe({
      next: (data) => this._categoryNames.set(data),
      error: (error) => console.error(error),
    });
  }
}
