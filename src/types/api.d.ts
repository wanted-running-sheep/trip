declare module 'request' {
  interface SearchFilterInterface {
    keyword: string;
    checkIn: string;
    checkOut: string;
    adults: number;
    children: number;
    isInitCheckInOut: boolean;
  }

  interface HotelInterface {
    hotel_name: string;
    occupancy: {
      base: number;
      max: number;
    };
  }

  interface searchQueryInterface {
    keyword: string;
    guests: number;
    currentPage: number;
  }

  type SearchQueryWithoutCurrentPageType = Omit<
    searchQueryInterface,
    'currentPage'
  >;
}
