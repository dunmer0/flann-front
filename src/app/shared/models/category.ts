import { Expense } from './expense';

export interface Category {
  id: number;
  name: string;
  anticipatedExpense: number;
  actualExpense: number;
  periodId: number;
}

export interface CategoryWithExpenses {
  id: number;
  name: string;
  anticipatedExpense: number;
  actualExpense: number;
  periodId: number;
  expenses: Expense[];
}

export interface CategoryAPI {
  id: number;
  category_name: string;
  anticipated_expense: number;
  actual_expenses: number;
  period_id: number;
  expenses: Expense[];
}

export function fromAPI(api: CategoryAPI): CategoryWithExpenses {
  return {
    id: api.id,
    name: api.category_name,
    anticipatedExpense: api.anticipated_expense,
    actualExpense: api.actual_expenses,
    periodId: api.period_id,
    expenses: api.expenses,
  }
}

  export function toAPI(category:Category):CategoryAPI {
    return {
      id: category.id,
      category_name: category.name,
      anticipated_expense: category.anticipatedExpense,
      actual_expenses: category.actualExpense,
      period_id: category.periodId,
      expenses: []
    }
  }





