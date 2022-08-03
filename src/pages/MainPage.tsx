import React from 'react';
import styled from 'styled-components';
import { Search } from '@/components';

const MainPage = () => {
  return (
    <Section>
      예약 페이지
      <Search />
    </Section>
  );
};

export default MainPage;

const Section = styled.section`
  padding: 0 30px;
`;
