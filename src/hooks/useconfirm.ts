import React, { useEffect, useState } from 'react';
import { AxiosResponse } from 'axios';
import { ApiUrlEnum } from '@/types/enum';
import { apiRequest } from '@/api/instance';
import { HotelInterface, ReservedHotelAddNameInterface } from 'request';

const useconfirm = () => {
  const [hotelKeys, setHotelKeys] = useState<string[]>(
    Object.keys(localStorage)
  );
  const [allHotelsNames, setAllHotelNames] = useState<string[]>([]);
  const [reservedHotels, setReservedHotels] = useState<
    ReservedHotelAddNameInterface[]
  >([]);

  useEffect(() => {
    getAllHotelNames();
    getAllReservations();
  }, []);

  const getAllHotelNames = async () => {
    try {
      const hotelResponse: AxiosResponse<HotelInterface[]> =
        await apiRequest.get<HotelInterface[]>(ApiUrlEnum.HOTELS);

      if (hotelResponse) {
        setAllHotelNames(hotelResponse.data.map((hotel) => hotel.hotel_name));
        setHotelKeys(hotelKeys.filter((name) => allHotelsNames.includes(name)));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAllReservations = () => {
    let formattedReservation: ReservedHotelAddNameInterface[] = [];

    hotelKeys.forEach((key) => {
      const hotels: any[] = JSON.parse(localStorage.getItem(key) as string);
      hotels.forEach((hotel: any) => {
        hotel.hotelName = key;
        formattedReservation.push(hotel);
      });
    });
    formattedReservation.sort(
      (a, b) => new Date(a.checkIn).getTime() - new Date(b.checkIn).getTime()
    );
    setReservedHotels(formattedReservation);
  };
  return { reservedHotels, setReservedHotels };
};

export default useconfirm;
