import React, { useState } from 'react';
import styled from 'styled-components';
import CalendarIcon from '@/assets/icons/CalendarIcon';
import Calendar from '.';
import { addDays, format } from 'date-fns';
import { useRecoilValue } from 'recoil';
import { searchFilterState } from '@/recoil/atoms';

const Input = () => {
  const WEEK = 7;
  const DATE_FORMAT = 'M월 d일';
  const { checkIn, checkOut } = useRecoilValue(searchFilterState);
  const [showCalendar, setShowCalendar] = useState(false);

  return (
    <Wrapper>
      <Container onClick={() => setShowCalendar((prev) => !prev)}>
        <IconContainer>
          <CalendarIcon />
        </IconContainer>
        <CheckInOutContainer>
          <CheckInOutItem>체크인</CheckInOutItem>
          <CheckInOutItem>
            {checkIn
              ? format(new Date(checkIn), DATE_FORMAT)
              : format(addDays(new Date(), WEEK), DATE_FORMAT)}
          </CheckInOutItem>
        </CheckInOutContainer>
        <NightsContainer>1박</NightsContainer>
        <CheckInOutContainer>
          <CheckInOutItem>체크아웃</CheckInOutItem>
          <CheckInOutItem>
            {checkOut
              ? format(new Date(checkOut), DATE_FORMAT)
              : format(addDays(new Date(), WEEK + 1), DATE_FORMAT)}
          </CheckInOutItem>
        </CheckInOutContainer>
      </Container>
      {showCalendar && <Calendar />}
    </Wrapper>
  );
};

export default Input;

const Wrapper = styled.div`
  width: 330px;
  height: 60px;
  display: flex;
  border: 1px solid ${({ theme }) => theme.color.border.lightgray};
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.color.background.gray};
  }
`;

const Container = styled.div`
  position: relative;
  flex: 1 1 0;
  height: 100%;
  display: flex;
`;

const IconContainer = styled.div`
  width: 56px;
  height: 100%;
  padding: 15px 13px;
`;

const CheckInOutContainer = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-right: 15px;

  &:last-child {
    padding-left: 15px;
    text-align: right;
  }
`;

const CheckInOutItem = styled.p`
  &:first-child {
    font-size: 0.8rem;
    font-weight: 500;
    line-height: 18px;
    color: ${({ theme }) => theme.color.font.darkgray};
  }

  &:last-child {
    font-size: 1rem;
    font-weight: 700;
    line-height: 25px;
  }
`;

const NightsContainer = styled.div`
  min-width: 55px;
  ${({ theme }) => theme.mixins.flexBox()}
  font-size: 0.9rem;
  color: ${({ theme }) => theme.color.font.darkgray};
`;
