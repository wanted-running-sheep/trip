export const NavigateEnum = {
  MAIN: '/',
  CONFIRM: '/reservation-confirm',
} as const;

export type NavigateType = typeof NavigateEnum[keyof typeof NavigateEnum];
