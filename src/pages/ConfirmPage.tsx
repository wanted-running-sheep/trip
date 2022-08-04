import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { HotelInterface, ReservedHotelInterface } from 'request';
import { apiRequest } from '@/api/instance';
import { ApiUrlEnum } from '@/types/enum';
import HotelCardReserved from '@/components/HotelCardReserved';

interface ReservedHotelAddNameProps extends ReservedHotelInterface {
  hotelName: string;
}

const ConfirmPage = () => {
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
      JSON.stringify({
        checkIn: '2022-08-10',
        checkOut: '2022-08-14',
        adults: 2,
        children: 2,
      })
    );
  };
  /*// 추가
  const addReservation = (hotel: ReservedHotelInterface) => {
    setReservedHotel((prev) => [...prev, hotel]);
  };

  // 삭제
  const removeReservation = (hotel: ReservedHotelInterface) => {
    setReservedHotel(
      reservedHotel.filter((reservedHotel) => reservedHotel !== hotel) //key로 비교
    );
  };*/

  const [hotelsKey, setHotelsKey] = useState<string[]>(
    Object.keys(localStorage)
  );
  const [allHotels, setAllHotels] = useState<string[]>([]);
  const [reservedHotels, setReservedHotels] = useState<
    ReservedHotelAddNameProps[]
  >([]);

  const getAllHotelNames = async () => {
    try {
      const hotelResponse = await apiRequest.get<HotelInterface[]>(
        ApiUrlEnum.HOTELS
      );

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
      const hotels = JSON.parse(localStorage.getItem(key) as string);
      Array.isArray(hotels)
        ? hotels.forEach((hotel) => {
            hotel.hotelName = key;
            formattedReservation.push(hotel);
          })
        : ((hotels.hotelName = key), formattedReservation.push(hotels));
    });
    formattedReservation.sort(
      (a, b) => new Date(a.checkIn).getTime() - new Date(b.checkIn).getTime()
    );
    setReservedHotels(formattedReservation);
  };

  // [ ] 종속성을 잘 찾기. 지금은 최초 로딩에만 렌더링됨.
  useEffect(() => {
    // pushLocalStorageTestHotel();
    getAllHotelNames();
    getAllReservation();
  }, []);

  return (
    <Section>
      <H1>예약 확인</H1>
      {reservedHotels.map((hotel, index) => (
        <HotelCardReserved
          key={index}
          hotelName={hotel.hotelName}
          checkIn={hotel.checkIn}
          checkOut={hotel.checkOut}
          adults={hotel.adults}
          childrenParam={hotel.children}
        />
      ))}
      {/*[ ] 로딩화면은 스켈레톤으로 */}
    </Section>
  );
};

export default ConfirmPage;

const Section = styled.section`
  padding: 30px;
`;

const H1 = styled.h1`
  font-size: 25px;
  margin-bottom: 30px;
`;
