import React, { useEffect, useState } from 'react';
import { ApiUrlEnum } from '@/types/enum';
import { apiRequest } from '@/api/instance';
import ConfirmHotelCard from './ConfirmHotelCard';
import { HotelInterface, ReservedHotelInterface } from 'request';
import { AxiosResponse } from 'axios';

interface ReservedHotelAddNameProps extends ReservedHotelInterface {
  hotelName: string;
}

//test data
const pushLocalStorageTestHotel = () => {
  localStorage.setItem(
    '에코랜드 호텔',
    JSON.stringify([
      {
        checkIn: '2022-08-05',
        checkOut: '2022-08-09',
        adults: 2,
        children: 1,
      },
      {
        checkIn: '2022-08-15',
        checkOut: '2022-08-20',
        adults: 3,
        children: 2,
      },
    ])
  );
  localStorage.setItem(
    '파르나스 호텔 제주',
    JSON.stringify([
      {
        checkIn: '2022-08-10',
        checkOut: '2022-08-14',
        adults: 2,
        children: 2,
      },
    ])
  );
};
const ConfirmHotelList = () => {
  const [hotelsKey, setHotelsKey] = useState<string[]>(
    Object.keys(localStorage)
  );
  const [allHotels, setAllHotels] = useState<string[]>([]);
  const [reservedHotels, setReservedHotels] = useState<
    ReservedHotelAddNameProps[]
  >([]);

  const getAllHotelNames = async () => {
    try {
      const hotelResponse: AxiosResponse<HotelInterface[]> =
        await apiRequest.get<HotelInterface[]>(ApiUrlEnum.HOTELS);

      if (hotelResponse) {
        setAllHotels(hotelResponse.data.map((a) => a.hotel_name));
        setHotelsKey(hotelsKey.filter((name) => allHotels.includes(name)));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAllReservation = () => {
    let formattedReservation: ReservedHotelAddNameProps[] = [];

    hotelsKey.forEach((key) => {
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

  useEffect(() => {
    pushLocalStorageTestHotel();
    getAllHotelNames();
    getAllReservation();
  }, []);

  const removeTest = ({ hotelName, checkIn, checkOut }: any) => {
    // TODO localStorage Get 하고 length가 1 초과 일 경우 아래 로직 구현
    // TODO 아닐 경우 그냥 remove

    const selectedHotel = JSON.parse(localStorage.getItem(hotelName) as string);
    const test = selectedHotel.filter(
      (hotel: any) => hotel.checkIn !== checkIn && hotel.checkOut !== checkOut
    );
    localStorage.setItem(hotelName, JSON.stringify(test));

    const filtered = reservedHotels.filter(
      (hotel) =>
        !(
          hotel.hotelName === hotelName &&
          hotel.checkIn === checkIn &&
          hotel.checkOut === checkOut
        )
    );
    setReservedHotels(filtered);
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
          removeTest={removeTest}
        />
      ))}
    </>
  );
};

export default ConfirmHotelList;
