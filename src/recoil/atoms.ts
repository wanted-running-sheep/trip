import { atom } from 'recoil';
import { SearchFilterInterface } from 'request';

export const searchFilterState = atom<SearchFilterInterface>({
  key: 'searchFilterState',
  default: {
    keyword: '',
    checkIn: '',
    checkOut: '',
    adults: 0,
    children: 0,
    isInitCheckInOut: true,
    activeMonth: new Date(),
  },
});
