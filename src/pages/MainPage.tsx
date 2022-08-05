import React from 'react';
import styled from 'styled-components';

import { Search, HotelList } from '@/components';

const MainPage = () => {
  return (
    <Section>
      <Search />
      <H1>🏠 호텔 목록</H1>
      <HotelList />
    </Section>
  );
};

export default MainPage;

const Section = styled.section`
  padding: 0 30px;
`;

const H1 = styled.h1`
  font-size: 25px;
  margin-bottom: 10px;
`;
