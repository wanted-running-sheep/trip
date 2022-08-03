import React from 'react';
import useCalendar from '@/hooks/useCalendar';
import styled, { css } from 'styled-components';
import { addMonths, differenceInCalendarDays, format } from 'date-fns';
import LeftDirection from '@/assets/icons/LeftDirection';
import RightDirection from '@/assets/icons/RightDirection';
import { WEEK_NAMES } from '@/constants';
import { useSetRecoilState } from 'recoil';
import { searchFilterState } from '@/recoil/atoms';

const Calendar = () => {
  const {
    activeDate,
    setActiveDate,
    dates,
    DEFAULT_DATE_FORMAT,
    differenceMonth,
    isInitCheckInOut,
  } = useCalendar();
  const setSearchFilter = useSetRecoilState(searchFilterState);
  const onClickMonth = (direction: 1 | -1) => {
    if (differenceMonth + direction > 12 || differenceMonth + direction < 0) {
      alert('캘린더는 현재 날짜 부터 1년 까지만 제공됩니다.');
      return;
    }
    setActiveDate(addMonths(activeDate, direction));
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
    <Wrapper>
      <CalendarWrapper>
        <HeaderWrappder>
          <IconContainer onClick={() => onClickMonth(-1)}>
            <LeftDirection />
          </IconContainer>
          <MonthContainer>
            <h2 className="currentMonth">
              {format(activeDate, DEFAULT_DATE_FORMAT)}
            </h2>
          </MonthContainer>
          <IconContainer onClick={() => onClickMonth(1)}>
            <RightDirection />
          </IconContainer>
        </HeaderWrappder>
        <DateWrapper>
          <WeekNmaesWrapper>
            {WEEK_NAMES.map((day) => (
              <WeekNmaesContainer key={day}>{day}</WeekNmaesContainer>
            ))}
          </WeekNmaesWrapper>
          <WeekContainer>
            {dates.map(
              (
                {
                  isLastDay,
                  isCurrentMonth,
                  date,
                  originDate,
                  isSelectedCheckIn,
                  isSelectedCheckOut,
                  isCheckInOutInclude,
                },
                index
              ) => {
                return (
                  <WeekItemContainer
                    key={index}
                    isCheckInOutInclude={isCheckInOutInclude}
                    isSelectedCheckIn={isSelectedCheckIn}
                    isSelectedCheckOut={isSelectedCheckOut}
                    originDate={originDate}
                    isInitCheckInOut={isInitCheckInOut}
                  >
                    <WeekItemBox isCheckInOutInclude={isCheckInOutInclude}>
                      <WeekItem
                        isLastDay={isLastDay}
                        isCurrentMonth={isCurrentMonth}
                        {...(!isLastDay &&
                          isCurrentMonth && {
                            onClick: () => onClickDate(originDate),
                          })}
                        isSelectedCheckIn={isSelectedCheckIn}
                        isSelectedCheckOut={isSelectedCheckOut}
                        isCheckInOutInclude={isCheckInOutInclude}
                      >
                        {date}
                      </WeekItem>
                    </WeekItemBox>
                  </WeekItemContainer>
                );
              }
            )}
          </WeekContainer>
        </DateWrapper>
      </CalendarWrapper>
    </Wrapper>
  );
};

export default Calendar;

interface WeekItemProps {
  isCurrentMonth: boolean;
  isLastDay: boolean;
  isSelectedCheckIn: boolean;
  isSelectedCheckOut: boolean;
  isCheckInOutInclude: boolean;
}

interface WeekItemContainerProps {
  isCheckInOutInclude: boolean;
  isSelectedCheckIn: boolean;
  isSelectedCheckOut: boolean;
  originDate: string;
  isInitCheckInOut: boolean;
}

const Wrapper = styled.div`
  width: 405px;
  display: flex;
  position: absolute;
  padding: 20px;
  left: 10px;
  top: 60px;
  ${({ theme }) => theme.mixins.boxShadow};
`;

const CalendarWrapper = styled.div`
  flex-grow: 1;
`;

const HeaderWrappder = styled.div`
  display: flex;
  justify-content: space-around;
`;

const MonthContainer = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: center;
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    border-radius: 50%;
    background-color: ${({ theme }) => theme.color.background.gray};
  }
`;

const DateWrapper = styled.div`
  padding-top: 20px;
`;
const WeekNmaesWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
`;

const WeekNmaesContainer = styled.p`
  color: ${({ theme }) => theme.color.font.darkgray};
  ${({ theme }) => theme.mixins.flexBox()};
  font-size: 0.9rem;
  height: 30px;
  width: 30px;
`;

const WeekContainer = styled.div`
  padding: 6px 0px 0px;
  width: 100%;
  height: 240px;
  display: flex;
  flex-wrap: wrap;
`;

const WeekItemContainer = styled.div<WeekItemContainerProps>`
  height: 34px;

  cursor: pointer;
  position: relative;
  ${({ theme }) => theme.mixins.flexBox()};
  width: calc(100% / 7);

  ${(props) => {
    const {
      theme,
      isSelectedCheckIn,
      isSelectedCheckOut,
      isCheckInOutInclude,
      isInitCheckInOut,
    } = props;

    let gradient = theme.color.background.white;
    let padding = '5px';

    if ((isSelectedCheckIn || isSelectedCheckOut) && isInitCheckInOut) {
      gradient = isSelectedCheckIn
        ? theme.mixins.boxGradient.right()
        : theme.mixins.boxGradient.left();
      padding = '0px';
    } else {
      if (isCheckInOutInclude && isInitCheckInOut) {
        gradient = theme.color.background.lightred;
        padding = '0px';
      }
    }

    return css`
      background: ${gradient};
      padding: ${padding};
    `;
  }}
`;

const WeekItemBox = styled.div<{ isCheckInOutInclude: boolean }>`
  ${({ theme }) => theme.mixins.flexBox()};
  width: 34px;
  height: 34px;
`;

const WeekItem = styled(WeekNmaesContainer)<WeekItemProps>`
  font-size: 0.9rem;
  font-weight: 500;
  width: 34px;
  height: 34px;
  ${({
    theme,
    isLastDay,
    isCurrentMonth,
    isSelectedCheckIn,
    isSelectedCheckOut,
    isCheckInOutInclude,
  }) => {
    const isSelected = isSelectedCheckIn || isSelectedCheckOut;
    return css`
      color: ${!isLastDay && isSelected
        ? theme.color.font.white
        : !isLastDay && isCurrentMonth
        ? theme.color.font.black
        : theme.color.font.lightgray};
      background-color: ${isSelected
        ? theme.color.background.red
        : isCheckInOutInclude
        ? theme.color.background.lightred
        : theme.color.background.white};
      border-radius: ${isSelected ? '100%' : 'none'};
      &: hover {
        border-radius: ${!isLastDay && '100%'};
        border: ${!isLastDay &&
        isCurrentMonth &&
        `2px solid ${theme.color.border.red}`};
      }
    `;
  }}
`;
