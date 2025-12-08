import { Component, inject, OnInit } from '@angular/core';
import { PeriodService } from '../../shared/service/period-service';
import { CustomDatePipePipe } from '../../shared/pipes/custom-date-pipe-pipe';
import { RouterOutlet, Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-period-component',
  imports: [CustomDatePipePipe, RouterOutlet],
  templateUrl: './period-component.html',
  styleUrl: './period-component.css',
})
export class PeriodComponent implements OnInit {
  ngOnInit(): void {}
  constructor() {
    this.route.params.subscribe((params) => {
      this.periodService.getAllPeriods();
    });
  }
  periodService = inject(PeriodService);
  router = inject(Router);
  route = inject(ActivatedRoute);

  callPeriods() {
    for (let period of this.periodService.periods()) {
      console.log(period);
    }
  }

  getOnePeriod(periodId: number) {
    this.periodService.getPeriod(periodId, true);

    this.router.navigate([`detail/${periodId}`], { relativeTo: this.route });
  }

  goToPeriodAdd() {
    this.router.navigate(['add'], { relativeTo: this.route });
  }
}
