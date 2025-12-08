import { Component, inject, signal } from '@angular/core';
import { PeriodService } from '../../../shared/service/period-service';
import { PeriodToAdd } from '../../../shared/models/period';
import { form, Field, required } from '@angular/forms/signals';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

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
  location = inject(Location);
  router = inject(Router);

  addPeriod() {
    let periodToAdd = {
      start: this.periodModel().start,
      end: this.periodModel().end,
    };
    this.periodService.addPeriod(periodToAdd).subscribe(() => {
      this.location.back();
    });
  }
}
