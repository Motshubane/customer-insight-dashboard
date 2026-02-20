import { subDays } from 'date-fns';
import type { DateRange, FilterState } from '@/shared/types';

export const DEFAULT_DATE_RANGE: DateRange = {
  start: subDays(new Date(), 30),
  end: new Date(),
};

export const DEFAULT_FILTER_STATE: FilterState = {
  dateRange: DEFAULT_DATE_RANGE,
  provinces: [],
  customerTypes: [],
  riskLevels: [],
  accountTypes: [],
  accountStatus: [],
  searchQuery: '',
  sortBy: 'name',
  sortOrder: 'asc',
};