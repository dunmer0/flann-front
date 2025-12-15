import { Routes } from '@angular/router';
import { PeriodComponent } from './core/period-component/period-component';
import { PeriodAddComponent } from './core/period-component/period-add-component/period-add-component';
import { PeriodDetailComponent } from './core/period-component/period-detail-component/period-detail-component';
import {CategoryComponent} from './core/category-component/category-component';
import {CategoryAdd} from './core/category-component/category-add/category-add';

export const routes: Routes = [
  {
    path: 'perioade',
    component: PeriodComponent,
    children: [
      { path: 'add', component: PeriodAddComponent },
      { path: 'detail/:id', component: PeriodDetailComponent,
        children: [
          {path: 'category-add', component: CategoryAdd},
          {path: 'category/:id', component: CategoryComponent },
        ] },
    ],
  },
];
