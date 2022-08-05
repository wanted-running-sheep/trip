import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Calendar as CalendarIcon } from '@/assets/icons';
import Calendar from './Calendar';
import { useRecoilValue } from 'recoil';
import { searchFilterState } from '@/recoil/atoms';
import { checkInOutText, getNights } from '@/utils';

const CalendarInput = () => {
  const { checkIn, checkOut, isInitCheckInOut } =
    useRecoilValue(searchFilterState);
  const [showCalendar, setShowCalendar] = useState(false);
  const { formatChecInText, formatCheckOutText } = checkInOutText;
  const wrpperRef = useRef<HTMLDivElement>(null);

  const onClickCalendarOutside = (event: MouseEvent) => {
    if (!wrpperRef.current?.contains(event.target as Node)) {
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
    <Wrapper ref={wrpperRef}>
      <Container onClick={() => setShowCalendar((prev) => !prev)}>
        <CalendarIcon />
        <CalendarWrapper>
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
        </CalendarWrapper>
      </Container>
      {showCalendar && <Calendar />}
    </Wrapper>
  );
};

export default CalendarInput;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  cursor: pointer;
`;
const Container = styled.div`
  ${({ theme }) => theme.mixins.flexBox('center')}
  position: relative;
  flex: 1 1 0;
  height: 100%;
`;
const CalendarWrapper = styled.div`
  width: 100%;
  ${({ theme }) => theme.mixins.flexBox('center', 'space-between')}
`;
const CheckInOutContainer = styled.div`
  flex-grow: 1;
  display: grid;
  align-items: center;
  padding-right: 15px;

  &:last-child {
    padding-left: 15px;
    text-align: right;
  }
`;

const CheckInOutItem = styled.p`
  &:first-child {
    font-size: 0.8rem;
    line-height: 17px;
    color: ${({ theme }) => theme.color.font.gray};
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
