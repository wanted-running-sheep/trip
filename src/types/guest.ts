import { SearchFilterInterface } from 'request';
import { CounterType } from '@/types/enum';

export type GuestStateType = Pick<SearchFilterInterface, 'adults' | 'children'>;
export type GuestActionType = {
  name: keyof GuestStateType;
  type: CounterType;
};
