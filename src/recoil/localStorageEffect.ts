import { atom, AtomEffect } from 'recoil';
import { ReservedHotelInterface } from 'request';

const localStorageEffect: <T>(key: string) => AtomEffect<T> =
  (key: string) =>
  ({ setSelf, onSet }) => {
    const savedValue = localStorage.getItem(key);
    if (savedValue != null) {
      setSelf(JSON.parse(savedValue));
    }

    onSet((newValue, _, isReset) => {
      isReset
        ? localStorage.removeItem(key)
        : localStorage.setItem(key, JSON.stringify(newValue));
    });
  };

export const reservedHotelsState = atom<ReservedHotelInterface[]>({
  key: 'ReservedHotels',
  default: [],
  effects: [localStorageEffect<ReservedHotelInterface[]>('ReservedHotels')],
});
