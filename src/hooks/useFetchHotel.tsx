import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { AxiosResponse } from 'axios';

import { HotelInterface, searchQueryWithoutCurrentPage } from 'request';
import { apiRequest } from '@/api/instance';
import { ApiUrlEnum } from '@/types/enum';
import { getTotalPage, getFullSearchQuery } from '@/utils';
import { formattedSearchFilter } from '@/recoil/selectors';

const TIMEOUT_INTERVAL = 500;
const FIRST_PAGE = 1;

const useFetchHotel = (isIntersecting: boolean) => {
  const query = useRecoilValue(formattedSearchFilter);
  const [currentPage, setCurrentPage] = useState<number>(FIRST_PAGE);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hotelList, setHotelList] = useState<HotelInterface[]>([]);
  const [totalPage, setTotalPage] = useState<number>(Number.MAX_VALUE);
  const [toggleReset, setToggleReset] = useState<boolean>(false);

  useEffect(() => {
    if (isKeepFetch()) {
      setCurrentPage((prevPage) => prevPage + 1);
      requestFilteredQuery();
    }
  }, [isIntersecting, toggleReset]);

  useEffect(() => {
    resetValue();
    setToggleReset((prevState) => !prevState);
  }, [JSON.stringify(query)]);

  const resetValue = () => {
    setHotelList([]);
    setCurrentPage(FIRST_PAGE);
    setTotalPage(Number.MAX_VALUE);
  };

  const isKeepFetch = () => {
    return isIntersecting && currentPage <= totalPage;
  };

  const fetchHotelData = async ({
    keyword,
    guests,
  }: searchQueryWithoutCurrentPage) => {
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
    return hotelResponse;
  };

  const requestFilteredQuery = async () => {
    setIsLoading(true);

    const hotelResponse = await fetchHotelData(query);
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
