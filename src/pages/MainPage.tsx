import { reservedHotelsState } from '@/recoil/localStorageEffect';
import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { ReservedHotelInterface } from 'request';
import styled from 'styled-components';

const MainPage = () => {
  const [reserved, setReserved] =
    useRecoilState<ReservedHotelInterface[]>(reservedHotelsState);

  useEffect(() => {
    // setReserved((prev) => [
    //   ...prev,
    //   {
    //     hotel_name: 'no.1 hotel',
    //     checkIn: '2022-08-05',
    //     checkOut: '2022-08-09',
    //     adults: 2,
    //     children: 1,
    //   },
    // ]);

    console.log(localStorage);
    console.log(reserved);
  }, []);

  return <Section>예약 페이지</Section>;
};

export default MainPage;

const Section = styled.section`
  padding: 0 30px;
`;
