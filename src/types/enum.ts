export const ApiUrlEnum = {
  HOTELS: '/hotels',
} as const;
export const CounterEnum = {
  INCREMENT: 'INCREMENT',
  DECREMENT: 'DECREMENT',
};
export const PeopleEnum = {
  adults: {
    name: '성인',
  },
  children: {
    name: '아이',
  },
} as const;

export type ApiUrlType = typeof ApiUrlEnum[keyof typeof ApiUrlEnum];
export type PeopleType = keyof typeof PeopleEnum;
