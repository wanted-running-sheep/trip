import React, { useEffect, useState } from 'react';

import { AxiosResponse } from 'axios';
import { apiRequest } from '@/api/instance';
import { HotelInterface, SearchQueryWithoutCurrentPageType } from 'request';

import { ApiUrlEnum } from '@/types/enum';
import { getTotalPage, getFullSearchQuery } from '@/utils';

const TIMEOUT_INTERVAL = 500;
const FIRST_PAGE = 1;

const useFetchHotel = (
  isIntersecting: boolean,
  query: SearchQueryWithoutCurrentPageType
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
  }: SearchQueryWithoutCurrentPageType) => {
    setIsLoading(true);

    const hotelResponse: AxiosResponse<HotelInterface[]> = await apiRequest.get<
      HotelInterface[]
    >(
      ApiUrlEnum.HOTELS,
      getFullSearchQuery({
        keyword,
        guests,
        currentPage,
      })
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
