import React, { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { searchFilterState } from '@/recoil/atoms';

import { SearchFilterInterface } from 'request';
import { areIntervalsOverlapping } from 'date-fns';

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
    for (let { checkIn, checkOut } of reservedData) {
      if (isDateBetweenReservation(checkIn, checkOut)) {
        setIsReserved(true);
        break;
      }
    }
  };

  const isDateBetweenReservation = (
    savedCheckIn: string,
    savedCheckOut: string
  ) => {
    const checkIn = searchFilter.checkIn;
    const checkOut = searchFilter.checkOut;

    return areIntervalsOverlapping(
      { start: new Date(savedCheckIn), end: new Date(savedCheckOut) },
      { start: new Date(checkIn), end: new Date(checkOut) }
    );
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
