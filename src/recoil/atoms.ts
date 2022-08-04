import { atom, atomFamily } from 'recoil';
import { ReservedHotelInterface, SearchFilterInterface } from 'request';
import { localStorageEffect } from './localStorageEffect';

export const searchFilterState = atom<SearchFilterInterface>({
  key: 'searchFilterState',
  default: {
    keyword: '',
    checkIn: '',
    checkOut: '',
    adults: 0,
    children: 0,
  },
});

//예약된 호텔 family
export const reservedHotelState = atomFamily<ReservedHotelInterface[], string>({
  key: 'ReservedHotelFamily',
  default: [] as ReservedHotelInterface[],
  effects: (hotelName) => [
    localStorageEffect<ReservedHotelInterface[]>(hotelName),
  ],
});

//모든 호텔 keys
export const reservedHotelsKeyState = atom<string[]>({
  key: 'localStorageKeys',
  default: Object.keys(localStorage),
});
