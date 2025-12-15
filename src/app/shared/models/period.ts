import {Category, CategoryAPI, fromAPI} from './category';

export interface Period {
  id: number;
  start: string;
  end: string;
}

export interface PeriodToAdd {
  start: string;
  end: string;
}

export interface PeriodWithCategories {
  id: number;
  start: string;
  end: string;
  categories: Category[];
}

export interface PeriodWithCategoriesAPI {
  id: number;
  start: string;
  end: string;
  categories: CategoryAPI[];
}

export function mapPeriod(api: PeriodWithCategoriesAPI): PeriodWithCategories{
  return {
    id: api.id,
    start: api.start,
    end: api.end,
    categories: api.categories.map(category => fromAPI(category))
  }
}
