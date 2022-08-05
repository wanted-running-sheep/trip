import React, { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { searchFilterState } from '@/recoil/atoms';

import { SearchFilterInterface } from 'request';

const useReservation = (hotelName: string) => {
  const [isReserved, setIsReserved] = useState<boolean>(false);
  const searchFilter = useRecoilValue(searchFilterState);

  useEffect(() => {
    checkReservation();
  }, []);

  const checkReservation = () => {
    const reservedData = loadReservation(hotelName);
    if (!reservedData) {
      return setIsReserved(false);
    }
    for (let data of reservedData) {
      const savedCheckIn = getNumberDate(data.checkIn);
      const savedCheckOut = getNumberDate(data.checkOut);
      if (isDateBetweenReservation(savedCheckIn, savedCheckOut)) {
        setIsReserved(true);
        break;
      }
    }
  };

  const isDateBetweenReservation = (
    savedCheckIn: number,
    savedCheckOut: number
  ) => {
    const checkIn = getNumberDate(searchFilter.checkIn);
    const checkOut = getNumberDate(searchFilter.checkOut);
    if (
      (checkIn >= savedCheckIn && checkIn < savedCheckOut) ||
      (checkOut > savedCheckIn && checkOut <= savedCheckOut) ||
      (checkIn <= savedCheckIn && checkOut >= savedCheckOut)
    ) {
      return true;
    }
    return false;
  };

  const getNumberDate = (date: string) => {
    return Number(date.split('-').join(''));
  };

  const saveReservation = (hotelName: string) => {
    const copiedInfo: Partial<SearchFilterInterface> = { ...searchFilter };
    delete copiedInfo.keyword;

    const loadedData = localStorage.getItem(hotelName);
    if (loadedData) {
      const resevedHotel = JSON.parse(loadedData);
      localStorage.setItem(
        hotelName,
        JSON.stringify([...resevedHotel, copiedInfo])
      );
    } else {
      localStorage.setItem(hotelName, JSON.stringify([copiedInfo]));
    }
    setIsReserved(true);
  };

  const loadReservation = (hotelName: string) => {
    const loadedData = localStorage.getItem(hotelName) as string;
    return JSON.parse(loadedData);
  };

  return {
    isReserved,
    saveReservation,
  };
};

export default useReservation;
