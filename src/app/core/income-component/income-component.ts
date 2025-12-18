import { Component, computed, inject, OnInit } from '@angular/core';
import { IncomeService } from '../../shared/service/income-service';
import { PeriodService } from '../../shared/service/period-service';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-income-component',
  imports: [RouterOutlet],
  templateUrl: './income-component.html',
  styleUrl: './income-component.css',
})
export class IncomeComponent implements OnInit {
  incomeService = inject(IncomeService);
  periodService = inject(PeriodService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  incomes = computed(() => this.incomeService.incomes());
  income = computed(() => this.incomeService.selectedIncome());

  ngOnInit(): void {
    this.incomeService.getIncomes(this.periodService.selectedPeriod().id);
  }

  goToIncome() {
    // this.incomeService.getIncome(incomeId);
    this.router.navigate([{ outlets: { venit2: 'venit' } }], { relativeTo: this.route });
    console.log('Clicked');
  }
}
