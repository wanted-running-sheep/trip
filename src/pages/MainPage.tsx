import React from 'react';
import styled from 'styled-components';
import { Search } from '@/components';
import HotelList from '@/components/HotelList';

const MainPage = () => {
  return (
    <Section>
      <Search />
      <HotelList />
    </Section>
  );
};

export default MainPage;

const Section = styled.section`
  padding: 0 30px;
`;
