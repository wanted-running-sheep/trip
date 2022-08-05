import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { default as CalendarIcon } from '@/assets/icons/Calendar';
import Calendar from './Calendar';
import { useRecoilValue } from 'recoil';
import { searchFilterState } from '@/recoil/atoms';
import { checkInOutText, getNights } from '@/utils';

const CalendarInput = () => {
  const { checkIn, checkOut, isInitCheckInOut } =
    useRecoilValue(searchFilterState);
  const [showCalendar, setShowCalendar] = useState(false);
  const { formatChecInText, formatCheckOutText } = checkInOutText;
  const wrapperRef = useRef<HTMLDivElement>(null);

  const onClickCalendarOutside = (event: MouseEvent) => {
    if (!wrapperRef.current?.contains(event.target as Node)) {
      setShowCalendar((prev) => {
        return prev && false;
      });
    }
  };

  useEffect(() => {
    if (checkIn && checkOut && showCalendar) setShowCalendar(false);
  }, [checkOut]);

  useEffect(() => {
    document.addEventListener('mousedown', onClickCalendarOutside);
    return () => {
      document.removeEventListener('mousedown', onClickCalendarOutside);
    };
  }, []);

  return (
    <Wrapper ref={wrapperRef}>
      <Container onClick={() => setShowCalendar((prev) => !prev)}>
        <CalendarIcon />
        <CheckInOutContainer>
          <CheckInOutItem>체크인</CheckInOutItem>
          <CheckInOutItem>{formatChecInText(checkIn)}</CheckInOutItem>
        </CheckInOutContainer>
        <NightsContainer>{getNights(checkIn, checkOut)}박</NightsContainer>
        <CheckInOutContainer>
          <CheckInOutItem>체크아웃</CheckInOutItem>
          <CheckInOutItem>
            {formatCheckOutText(checkOut, isInitCheckInOut)}
          </CheckInOutItem>
        </CheckInOutContainer>
      </Container>
      {showCalendar && <Calendar />}
    </Wrapper>
  );
};

export default CalendarInput;

const Wrapper = styled.div`
  width: 280px;
  height: 100%;
  display: flex;
  position: relative;
  cursor: pointer;
`;

const Container = styled.div`
  position: relative;
  flex: 1 1 0;
  height: 100%;
  display: flex;
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
