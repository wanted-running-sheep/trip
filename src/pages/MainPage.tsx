import React, { useState } from 'react';
import styled from 'styled-components';
import { Search } from '@/components';
import HotelList from '@/components/HotelList';

const MainPage = () => {
  const [clickToggle, setClickToggle] = useState<boolean>(false);
  const searchQuery = {
    keyword: '',
    guests: 2,
  };

  const handleSearchClick = () => {
    setClickToggle((prev) => !prev);
  };

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
