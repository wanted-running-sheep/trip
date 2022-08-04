import React, { useRef } from 'react';
import useCalendar from '@/hooks/useCalendar';
import styled from 'styled-components';
import { addMonths, differenceInCalendarDays } from 'date-fns';
import { useSetRecoilState } from 'recoil';
import { searchFilterState } from '@/recoil/atoms';
import Header from './Header';
import Body from './Body';

const Calendar = () => {
  const { activeMonth, dates, differenceMonth, isInitCheckInOut } =
    useCalendar();
  const calendarRef = useRef<HTMLDivElement>(null);
  const setSearchFilter = useSetRecoilState(searchFilterState);

  const onClickMonth = (direction: 1 | -1) => {
    if (differenceMonth + direction > 12 || differenceMonth + direction < 0) {
      alert('캘린더는 현재 날짜 부터 1년 까지만 제공됩니다.');
      return;
    }
    setSearchFilter((prevFilter) => ({
      ...prevFilter,
      activeMonth: addMonths(activeMonth, direction),
    }));
  };

  const onClickDate = (date: string) => {
    setSearchFilter((prevFilter) => {
      if (!prevFilter.checkIn && !prevFilter.checkOut) {
        return {
          ...prevFilter,
          checkIn: date,
          isInitCheckInOut: false,
        };
      }

      if (prevFilter.checkIn && !prevFilter.checkOut) {
        if (
          differenceInCalendarDays(
            new Date(prevFilter.checkIn),
            new Date(date)
          ) > 0
        ) {
          return { ...prevFilter, checkIn: date, checkOut: '' };
        } else {
          return {
            ...prevFilter,
            checkOut: date,
            isInitCheckInOut: true,
          };
        }
      }

      if (prevFilter.checkIn && prevFilter.checkOut) {
        return {
          ...prevFilter,
          checkIn: date,
          checkOut: '',
          isInitCheckInOut: false,
        };
      }

      return prevFilter;
    });
  };

  return (
    <Wrapper ref={calendarRef}>
      <CalendarWrapper>
        <Header onClickMonth={onClickMonth} activeMonth={activeMonth} />
        <Body
          dates={dates}
          onClickDate={onClickDate}
          isInitCheckInOut={isInitCheckInOut}
        />
      </CalendarWrapper>
    </Wrapper>
  );
};

export default Calendar;

const Wrapper = styled.div`
  width: 405px;
  display: flex;
  position: absolute;
  padding: 20px;
  top: calc(100% + 10px);
  left: -38px;
  z-index: 2;
  ${({ theme }) => theme.mixins.boxShadow};
  background-color: ${({ theme }) => theme.color.background.white};
`;

const CalendarWrapper = styled.div`
  flex-grow: 1;
`;
