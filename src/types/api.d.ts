declare module 'request' {
  interface SearchFilterInterface {
    keyword: string;
    checkIn: string;
    checkOut: string;
    adults: number;
    children: number;
    isInitCheckInOut: boolean;
    activeMonth: Date;
  }

  interface HotelInterface {
    hotel_name: string;
    occupancy: {
      base: number;
      max: number;
    };
  }

  interface ReservedHotelInterface {
    checkIn: string;
    checkOut: string;
    adults: number;
    children: number;
  }

  interface ReservedHotelAddNameInterface extends ReservedHotelInterface {
    hotelName: string;
  }

  type removeReservationType = Pick<
    ReservedHotelAddNameInterface,
    'hotelName' | 'checkIn' | 'checkOut'
  >;

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
