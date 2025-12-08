import {enableProdMode} from '@angular/core';

export interface Expense {
  id: number;
  name: string;
  cost: number;
  date: string;
  categoryId: number;
}

export interface ExpenseAdd {
  name: string;
  cost: number;
  date: string;
  categoryId: number;
}

export interface ExpenseAddApi{
  id: number;
  name: string;
  cost: number;
  date: string;
  category_id: number;
}

export function toExpenseAddApi(expenseAdd: ExpenseAdd):ExpenseAddApi{
  return {
    id: NaN,
    name: expenseAdd.name,
    cost: expenseAdd.cost,
    date: expenseAdd.date,
    category_id: expenseAdd.categoryId
  }
}

export function fromExpenseAddAPI(api:ExpenseAddApi): Expense{
  return {
    id: api.id,
    name: api.name,
    cost: api.cost,
    date: api.date,
    categoryId: api.category_id,
  }
}

