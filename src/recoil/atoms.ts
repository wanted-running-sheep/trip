import { atom, atomFamily } from 'recoil';
import { ReservedHotelInterface, SearchFilterInterface } from 'request';
import { getDefaultSevenDayLater } from '@/utils';
import { localStorageEffect } from './localStorageEffect';

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

//예약된 호텔 family
export const reservedHotelState = atomFamily<ReservedHotelInterface[], string>({
  key: 'ReservedHotelFamily',
  default: [] as ReservedHotelInterface[],
  effects: (hotelName) => [
    localStorageEffect<ReservedHotelInterface[]>(hotelName),
  ],
});
