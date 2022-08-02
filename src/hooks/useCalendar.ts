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
import { formatDateToString } from '@/util/formatDateToString';

const useCalendar = () => {
  const DEFAULT_DATE_FORMAT = 'yyyy년 MM월';
  const FILTER_DATE_FORMAT = 'yyyy-MM-dd';
  const WEEK = 7;
  const [activeDate, setActiveDate] = useState(new Date());
  const [dates, setDates] = useState<CalendarDatesInterface[]>([]);
  const { checkIn, checkOut } = useRecoilValue(searchFilterState);

  const getDefaultSevenDayLater = (next = 0) => {
    return formatDateToString(addDays(new Date(), WEEK + next));
  };

  const getDates = () => {
    const startOfTheSelectedMonth = startOfMonth(activeDate);
    const endOfTheSelectedMonth = endOfMonth(activeDate);
    const startDate = startOfWeek(startOfTheSelectedMonth);
    const endDate = endOfWeek(endOfTheSelectedMonth);
    const confirmedCheckIn = checkIn ? checkIn : getDefaultSevenDayLater();
    const confirmedCheckOut =
      checkIn && !checkOut
        ? ''
        : checkOut
        ? checkOut
        : getDefaultSevenDayLater(1);
    /* const confirmedCheckOut = checkOut ? checkOut : getDefaultSevenDayLater(1); */

    let currentDate = startDate;
    let checkInOutIncludeDates: string[] = [];
    const allDatesAttrs: CalendarDatesInterface[] = [];

    if (isBefore(new Date(confirmedCheckIn), new Date(confirmedCheckOut))) {
      checkInOutIncludeDates = eachDayOfInterval({
        start: new Date(confirmedCheckIn),
        end: new Date(confirmedCheckOut),
      }).map((date) => formatDateToString(date));
    }

    while (currentDate <= endDate) {
      const isLastDay = differenceInCalendarDays(currentDate, new Date()) < 0;
      const isCurrentMonth = getMonth(currentDate) === getMonth(activeDate);
      const formatCurrentDate = formatDateToString(currentDate);

      allDatesAttrs.push({
        isLastDay,
        isCurrentMonth,
        originDate: format(currentDate, FILTER_DATE_FORMAT),
        date: isCurrentMonth ? format(currentDate, 'd') : '',
        isSelectedCheckIn: checkIn
          ? formatCurrentDate === formatDateToString(new Date(checkIn))
          : formatCurrentDate === getDefaultSevenDayLater(),
        isSelectedCheckOut: checkOut
          ? formatCurrentDate === formatDateToString(new Date(checkOut))
          : formatCurrentDate === getDefaultSevenDayLater(1),
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
    diffrenceMonth: differenceInCalendarMonths(activeDate, new Date()),
  };
};

export default useCalendar;
