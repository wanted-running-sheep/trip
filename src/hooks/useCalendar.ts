import { useEffect, useState } from 'react';
import { CalendarDatesInterface } from '@/types/calendar';
import {
  addDays,
  endOfMonth,
  endOfWeek,
  format,
  getMonth,
  startOfMonth,
  startOfWeek,
  differenceInCalendarDays,
  differenceInCalendarMonths,
  eachDayOfInterval,
  isBefore,
} from 'date-fns';
import { searchFilterState } from '@/recoil/atoms';
import { useRecoilValue } from 'recoil';
import { formatDateToString } from '@/utils';

const useCalendar = () => {
  const DEFAULT_DATE_FORMAT = 'yyyy년 MM월';
  const FILTER_DATE_FORMAT = 'yyyy-MM-dd';
  const WEEK = 7;
  const [activeDate, setActiveDate] = useState(new Date());
  const [dates, setDates] = useState<CalendarDatesInterface[]>([]);
  const { checkIn, checkOut, isInitCheckInOut } =
    useRecoilValue(searchFilterState);

  const getDefaultSevenDayLater = (next = 0) => {
    return formatDateToString(addDays(new Date(), WEEK + next));
  };

  const getDates = () => {
    const startOfTheSelectedMonth = startOfMonth(activeDate);
    const endOfTheSelectedMonth = endOfMonth(activeDate);
    const startDate = startOfWeek(startOfTheSelectedMonth);
    const endDate = endOfWeek(endOfTheSelectedMonth);
    const confirmedCheckIn = checkIn ? checkIn : getDefaultSevenDayLater();
    const confirmedCheckOut = checkOut ? checkOut : getDefaultSevenDayLater(1);

    let currentDate = startDate;
    let checkInOutIncludeDates: string[] = [];
    const allDatesAttrs: CalendarDatesInterface[] = [];

    if (isBefore(new Date(confirmedCheckIn), new Date(confirmedCheckOut))) {
      checkInOutIncludeDates = eachDayOfInterval({
        start: new Date(confirmedCheckIn),
        end: isInitCheckInOut
          ? new Date(confirmedCheckOut)
          : new Date(confirmedCheckIn),
      }).map((date) => formatDateToString(date));
    }

    while (currentDate <= endDate) {
      const isLastDay = differenceInCalendarDays(currentDate, new Date()) < 0;
      const isCurrentMonth = getMonth(currentDate) === getMonth(activeDate);
      const formatCurrentDate = formatDateToString(currentDate);
      const isSelectedCheckIn =
        !checkIn && isInitCheckInOut
          ? formatCurrentDate === getDefaultSevenDayLater()
          : checkIn
          ? formatCurrentDate === formatDateToString(new Date(checkIn))
          : false;
      const isSelectedCheckOut =
        !checkOut && isInitCheckInOut
          ? formatCurrentDate === getDefaultSevenDayLater(1)
          : checkOut
          ? formatCurrentDate === formatDateToString(new Date(checkOut))
          : false;

      allDatesAttrs.push({
        isLastDay,
        isCurrentMonth,
        originDate: format(currentDate, FILTER_DATE_FORMAT),
        date: format(currentDate, 'd'),
        isSelectedCheckIn,
        isSelectedCheckOut,
        isCheckInOutInclude: checkInOutIncludeDates.includes(formatCurrentDate),
      });
      currentDate = addDays(currentDate, 1);
    }
    setDates(allDatesAttrs);
  };

  useEffect(() => {
    getDates();
  }, [activeDate, checkIn, checkOut]);

  return {
    activeDate,
    setActiveDate,
    dates,
    DEFAULT_DATE_FORMAT,
    differenceMonth: differenceInCalendarMonths(activeDate, new Date()),
    isInitCheckInOut,
  };
};

export default useCalendar;
