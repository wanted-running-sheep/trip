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

  interface ReservedHotelInterface {
    hotel_name: string;
    checkIn: string;
    checkOut: string;
    adults: number;
    children: number;
  }
}
