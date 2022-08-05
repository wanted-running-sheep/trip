import { atom } from 'recoil';
import { SearchFilterInterface } from 'request';
import { getDefaultSevenDayLater } from '@/utils';

export const searchFilterState = atom<SearchFilterInterface>({
  key: 'searchFilterState',
  default: {
    keyword: '',
    checkIn: getDefaultSevenDayLater(),
    checkOut: getDefaultSevenDayLater(1),
    adults: 2,
    children: 0,
    isInitCheckInOut: true,
    activeMonth: new Date(),
  },
});

export const toggleSearchClickState = atom({
  key: 'toggleSearchClickState',
  default: false,
});
