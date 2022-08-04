import HotelList from '@/components/HotelList';
import React, { useState } from 'react';
import styled from 'styled-components';
import { Search } from '@/components';

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
      예약 페이지
      <Search />
      <button onClick={handleSearchClick}>검색</button>
      {clickToggle && <HotelList searchQuery={searchQuery} />}
    </Section>
  );
};

export default MainPage;

const Section = styled.section`
  padding: 0 30px;
`;
