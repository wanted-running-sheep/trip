import { useState } from 'react';
import { AxiosResponse } from 'axios';
import { HotelInterface } from 'request';
import { apiRequest } from '@/api/instance';

import { ApiUrlEnum } from '@/types/enum';

const useHotelModel = () => {
  const [hotels, setHotels] = useState<HotelInterface[]>([]);

  const getHotelData = async () => {
    try {
      const hotelResponse: AxiosResponse<HotelInterface[]> =
        await apiRequest.get<HotelInterface[]>(ApiUrlEnum.HOTELS);

      if (hotelResponse) {
        setHotels(hotelResponse.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getCurrentPageHotelData = async (page: number) => {
    try {
      const hotelResponse: AxiosResponse<HotelInterface[]> =
        await apiRequest.get<HotelInterface[]>(
          ApiUrlEnum.HOTELS,
          `?_page=${page}`
        );

      if (hotelResponse) {
        setHotels(hotelResponse.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return {
    hotels,
    getHotelData,
    getCurrentPageHotelData,
  };
};

export default useHotelModel;
