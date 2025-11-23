import { Component, inject, OnInit } from '@angular/core';
import { PeriodService } from '../../shared/service/period-service';
import { CustomDatePipePipe } from '../../shared/pipes/custom-date-pipe-pipe';

@Component({
  selector: 'app-period-component',
  imports: [CustomDatePipePipe],
  templateUrl: './period-component.html',
  styleUrl: './period-component.css',
})
export class PeriodComponent implements OnInit {
  ngOnInit(): void {
    this.periodService.getAllPeriods();
  }
  periodService = inject(PeriodService);

  callPeriods() {
    for (let period of this.periodService.periods()) {
      console.log(period);
    }
  }
}
