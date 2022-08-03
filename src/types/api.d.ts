declare module 'request' {
  interface SearchFilterInterface {
    keyword: string;
    checkIn: string;
    checkOut: string;
    adult: number;
    children: number;
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

  type searchQueryWithoutCurrentPage = Omit<
    searchQueryInterface,
    'currentPage'
  >;
}
