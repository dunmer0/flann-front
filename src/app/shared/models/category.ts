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
  name: string;
  anticipated_expense: number;
  actual_expenses: number;
  period_id: number;
  expenses: Expense[]
}

export function mapCategory(api: CategoryAPI): CategoryWithExpenses{
  return {
    id: api.id,
    name: api.name,
    anticipatedExpense: api.anticipated_expense,
    actualExpense: api.actual_expenses,
    periodId: api.period_id,
    expenses: api.expenses
  }
}
