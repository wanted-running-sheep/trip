import React, { useEffect, useState } from 'react';

import { AxiosResponse } from 'axios';
import { HotelInterface } from 'request';
import { apiRequest } from '@/api/instance';

import { ApiUrlEnum } from '@/types/enum';
import { searchQueryInterface } from 'request';
import getTotalPage from '@/utils/getTotalPage';

const TIMEOUT_INTERVAL = 500;
const FIRST_PAGE = 1;

const useFetchHotel = (
  isIntersecting: boolean,
  query: searchQueryInterface
) => {
  const [currentPage, setCurrentPage] = useState<number>(FIRST_PAGE);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hotelList, setHotelList] = useState<HotelInterface[]>([]);
  const [totalPage, setTotalPage] = useState<number>(Number.MAX_VALUE);

  useEffect(() => {
    if (isKeepFetch()) {
      setCurrentPage((prevPage) => prevPage + 1);
      requestFilteredQuery(query);
    }
  }, [isIntersecting]);

  const isKeepFetch = () => {
    return isIntersecting && currentPage <= totalPage;
  };

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

    if (currentPage === FIRST_PAGE) {
      setTotalPage(getTotalPage(hotelResponse));
    }

    setTimeout(() => {
      setHotelList((prev) => [...prev, ...hotelResponse.data]);
      setIsLoading(false);
    }, TIMEOUT_INTERVAL);
  };

  return { hotelList, isLoading };
};

export default useFetchHotel;
