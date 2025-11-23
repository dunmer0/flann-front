import { Component, inject, OnInit } from '@angular/core';
import { ButtonComponent } from '../../shared/components/button-component/button-component';
import { PeriodService } from '../../shared/service/period-service';
import { RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-main-component',
  standalone: true,
  imports: [ButtonComponent, RouterOutlet],
  templateUrl: './main-component.html',
  styleUrl: './main-component.css',
})
export class MainComponent implements OnInit {
  // periodService = inject(PeriodService);
  ngOnInit(): void {
    // this.periodService.getAllPeriods();
  }

  testButton() {
    // for (let period of this.periodService.periods()) {
    //   console.log(period);
    // }
  }
}
