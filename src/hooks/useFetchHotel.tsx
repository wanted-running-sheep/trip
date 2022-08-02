import React, { useEffect, useState } from 'react';

import { AxiosResponse } from 'axios';
import { HotelInterface } from 'request';
import { apiRequest } from '@/api/instance';

import { ApiUrlEnum } from '@/types/enum';
import { searchQueryInterface } from 'request';

const TIMEOUT_INTERVAL = 500;

const useFetchHotel = (
  isIntersecting: boolean,
  query: searchQueryInterface
) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hotelList, setHotelList] = useState<HotelInterface[]>([]);

  useEffect(() => {
    if (isIntersecting) {
      setCurrentPage((prevPage) => prevPage + 1);
      requestFilteredQuery(query);
    }
  }, [isIntersecting]);

  const requestFilteredQuery = async ({
    keyword,
    guests,
  }: searchQueryInterface) => {
    setIsLoading(true);

    const hotelResponse: AxiosResponse<HotelInterface[]> = await apiRequest.get<
      HotelInterface[]
    >(
      ApiUrlEnum.HOTELS,
      `?hotel_name_like=${keyword}&occupancy.base_lte=${guests}&occupancy.max_gte=${guests}&_page=${currentPage}`
    );

    setTimeout(() => {
      setHotelList((prev) => [...prev, ...hotelResponse.data]);
      setIsLoading(false);
    }, TIMEOUT_INTERVAL);
  };

  return { hotelList, isLoading };
};

export default useFetchHotel;
