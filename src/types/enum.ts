export const ApiUrlEnum = {
  HOTELS: '/hotels',
} as const;

export const NavigateEnum = {
  MAIN: '/',
  CONFIRM: '/reservation-confirm',
} as const;

export type ApiUrlType = typeof ApiUrlEnum[keyof typeof ApiUrlEnum];
export type NavigateType = typeof NavigateEnum[keyof typeof NavigateEnum];
