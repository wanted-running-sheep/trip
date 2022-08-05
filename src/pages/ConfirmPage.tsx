import React from 'react';
import styled from 'styled-components';
import ConfirmHotelList from '@/components/ConfirmHotelList';

const ConfirmPage = () => {
  return (
    <Section>
      <H1>📋 예약 확인</H1>
      <ConfirmHotelList />
    </Section>
  );
};

export default ConfirmPage;

const Section = styled.section`
  padding: 0 30px;
`;

const H1 = styled.h1`
  font-size: 25px;
  margin-bottom: 20px;
`;
