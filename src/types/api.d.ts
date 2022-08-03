declare module 'request' {
  interface SearchFilterInterface {
    keyword: string;
    checkIn: string;
    checkOut: string;
    adults: number;
    children: number;
  }

  interface HotelInterface {
    hotel_name: string;
    occupancy: {
      base: number;
      max: number;
    };
  }
}
