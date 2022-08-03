export const ApiUrlEnum = {
  HOTELS: '/hotels',
} as const;
export const NavigateEnum = {
  MAIN: '/',
  CONFIRM: '/reservation-confirm',
} as const;
export const CounterEnum = {
  INCREMENT: 'INCREMENT',
  DECREMENT: 'DECREMENT',
} as const;
export const PeopleEnum = {
  adults: {
    name: '성인',
  },
  children: {
    name: '아이',
  },
} as const;

export const CheckInOutEnum = {
  CHECK_IN: 'checkIn',
  CHECK_OUT: 'checkOut',
} as const;

export type ApiUrlType = typeof ApiUrlEnum[keyof typeof ApiUrlEnum];
export type NavigateType = typeof NavigateEnum[keyof typeof NavigateEnum];
export type CounterType = keyof typeof CounterEnum;
export type PeopleType = keyof typeof PeopleEnum;
export type CheckInOutType = typeof CheckInOutEnum[keyof typeof CheckInOutEnum];
