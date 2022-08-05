import React, { useEffect, useState } from 'react';
import { ApiUrlEnum } from '@/types/enum';
import { apiRequest } from '@/api/instance';
import ConfirmHotelCard from './ConfirmHotelCard';
import { HotelInterface, ReservedHotelAddNameInterface } from 'request';
import { AxiosResponse } from 'axios';

type removeReservationType = Omit<
  ReservedHotelAddNameInterface,
  'adults' | 'children'
>;

const ConfirmHotelList = () => {
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

  const removeReservation = ({
    hotelName,
    checkIn,
    checkOut,
  }: removeReservationType) => {
    // TODO localStorage Get 하고 length가 1 초과 일 경우 아래 로직 구현
    // TODO 아닐 경우 그냥
    // TODO 빈 배열은 비우기

    // useEffect(() => {
    //   console.log(reservedState);
    //   if (reservedState.length === 0) localStorage.removeItem(hotelName);
    // }, [reservedState.length]);
    const selectedHotel = JSON.parse(localStorage.getItem(hotelName) as string);
    const test = selectedHotel.filter(
      (hotel: any) =>
        !(hotel.checkIn === checkIn && hotel.checkOut === checkOut)
    );
    localStorage.setItem(hotelName, JSON.stringify(test));

    const filteredReservation = reservedHotels.filter(
      (hotel) =>
        !(
          hotel.hotelName === hotelName &&
          hotel.checkIn === checkIn &&
          hotel.checkOut === checkOut
        )
    );
    setReservedHotels(filteredReservation);
  };

  return (
    <>
      {reservedHotels.map((hotel, index) => (
        <ConfirmHotelCard
          key={index}
          hotelName={hotel.hotelName}
          checkIn={hotel.checkIn}
          checkOut={hotel.checkOut}
          adults={hotel.adults}
          childrenParam={hotel.children}
          removeReservation={removeReservation}
        />
      ))}
    </>
  );
};

export default ConfirmHotelList;
