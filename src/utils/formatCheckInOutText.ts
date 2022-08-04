import { DateFormatEnum } from '@/types/enum';
import { format, addDays } from 'date-fns';

const DATE_FORMAT = DateFormatEnum.FORMAT_KOR_MONTH_DAY;
const WEEK = 7;

const formatCheckOutText = (checkOut: string, isInitCheckInOut: boolean) => {
  if (checkOut) {
    return format(new Date(checkOut), DATE_FORMAT);
  }

  if (isInitCheckInOut && !checkOut) {
    return format(addDays(new Date(), WEEK + 1), DATE_FORMAT);
  }

  if (!isInitCheckInOut && !checkOut) {
    return '날짜 선택';
  }
};

const formatChecInText = (checkIn: string) => {
  return checkIn
    ? format(new Date(checkIn), DATE_FORMAT)
    : format(addDays(new Date(), WEEK), DATE_FORMAT);
};

export default { formatChecInText, formatCheckOutText };
