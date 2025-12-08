import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import {mapPeriod, Period, PeriodToAdd, PeriodWithCategories, PeriodWithCategoriesAPI} from '../models/period';
import { map, Observable, tap } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class PeriodService {
  http = inject(HttpClient);
  selectedPeriod = signal<PeriodWithCategories>({ id: 0, start: '', end: '', categories: [] });
  periods = signal<Period[]>([]);

  baseUrl: string = 'http://localhost:8000/api/v1/periods';

  addPeriod(periodToAdd: PeriodToAdd): Observable<Period> {
    return this.http.post<Period>(this.baseUrl, periodToAdd).pipe(
      map((period) => ({
        id: period.id,
        start: period.start,
        end: period.end,
      })),
      tap(() => this.getAllPeriods())
    );
  }

  getAllPeriods(): Period[] {
    this.http.get<Period[]>(this.baseUrl).subscribe({
      next: (data) => {
        this.periods.set(data);
      },
      error: (error) => {
        console.error('Could not fetch periods', error);
      },
    });
    return this.periods();
  }

  getPeriod(periodId: number, withCategories: boolean) {
    this.http
      .get<PeriodWithCategoriesAPI>(`${this.baseUrl}/${periodId}?categories=${withCategories}`).pipe(
        map((api) => mapPeriod(api))
    ).subscribe({
      next: (data) => {

        this.selectedPeriod.set(data);
      },
      error: (error) => {
        console.error('Could not fetch period service', error);
      }
    })
  }

  deletePeriod(periodId: number): void {
    this.http.delete(`${this.baseUrl}/${periodId}`);
  }
}
