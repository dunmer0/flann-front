export interface Income {
  id: number;
  name: string;
  amount: number;
  date: string;
  periodId: number;
}

export interface IncomeAPI {
  id: number;
  name: string;
  amount: number;
  date: string;
  period_id: number;
}

export interface IncomeUpdate {
  id: number;
  name: string;
  amount: number;
  date: string;
}

export function fromAPI(api: IncomeAPI): Income {
  return {
    id: api.id,
    name: api.name,
    amount: api.amount,
    date: api.date,
    periodId: api.period_id,
  };
}

export function toAPI(income: Income): IncomeAPI {
  return {
    id: income.id,
    name: income.name,
    amount: income.amount,
    date: income.date,
    period_id: income.periodId,
  };
}
