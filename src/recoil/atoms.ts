import { atom } from 'recoil';
import { ReservedHotelInterface, SearchFilterInterface } from 'request';
import { localStorageEffect } from './localStorageEffect';

export const searchFilterState = atom<SearchFilterInterface>({
  key: 'searchFilterState',
  default: {
    keyword: '',
    checkIn: '',
    checkOut: '',
    adult: 0,
    children: 0,
  },
});

export const reservedHotelsState = atom<ReservedHotelInterface[]>({
  key: 'ReservedHotels',
  default: [],
  effects: [localStorageEffect<ReservedHotelInterface[]>('ReservedHotels')],
});
