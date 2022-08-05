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
import { formatDateToString, getDefaultSevenDayLater } from '@/utils';
import { DateFormatEnum } from '@/types/enum';

const useCalendar = () => {
  const [dates, setDates] = useState<CalendarDatesInterface[]>([]);
  const { checkIn, checkOut, isInitCheckInOut, activeMonth } =
    useRecoilValue(searchFilterState);

  const getDates = () => {
    const startOfTheSelectedMonth = startOfMonth(activeMonth);
    const endOfTheSelectedMonth = endOfMonth(activeMonth);
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
      const isCurrentMonth = getMonth(currentDate) === getMonth(activeMonth);
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
        originDate: format(currentDate, DateFormatEnum.DEFAULT_FORMAT),
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
  }, [activeMonth, checkIn, checkOut]);

  return {
    activeMonth,
    dates,
    differenceMonth: differenceInCalendarMonths(activeMonth, new Date()),
    isInitCheckInOut,
  };
};

export default useCalendar;
