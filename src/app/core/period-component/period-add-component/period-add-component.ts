import { Component, inject, signal } from '@angular/core';
import { PeriodService } from '../../../shared/service/period-service';
import { PeriodToAdd } from '../../../shared/models/period';
import { form, Field } from '@angular/forms/signals';

@Component({
  selector: 'app-period-add-component',
  imports: [Field],
  templateUrl: './period-add-component.html',
  styleUrl: './period-add-component.css',
})
export class PeriodAddComponent {
  periodService = inject(PeriodService);
  periodModel = signal<PeriodToAdd>({
    start: '',
    end: '',
  });
  periodForm = form(this.periodModel);
}
