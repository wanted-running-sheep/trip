import { reservedHotelsState } from '@/recoil/atoms';
import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { ReservedHotelInterface } from 'request';
import styled from 'styled-components';

const MainPage = () => {
  return <Section>예약 페이지</Section>;
};

export default MainPage;

const Section = styled.section`
  padding: 0 30px;
`;
