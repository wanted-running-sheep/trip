export const ApiUrlEnum = {
  HOTELS: '/hotels',
} as const;

export type ApiUrlType = typeof ApiUrlEnum[keyof typeof ApiUrlEnum];
