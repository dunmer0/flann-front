import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Period, PeriodToAdd } from '../models/period';
import { map, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class PeriodService {
  http = inject(HttpClient);
  selectedPeriod = signal<Period>({ id: 0, start: '', end: '' });
  periods = signal<Period[]>([]);

  baseUrl: string = 'http://localhost:8000/api/v1/periods';

  addPeriod(periodToAdd: PeriodToAdd): Observable<Period> {
    return this.http.post<Period>(this.baseUrl, periodToAdd).pipe(
      map((period) => ({
        id: period.id,
        start: period.start,
        end: period.end,
      }))
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
}
