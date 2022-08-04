import React from 'react';
import styled from 'styled-components';

import { Search, HotelList } from '@/components';

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
