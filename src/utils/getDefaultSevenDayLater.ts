import { addDays } from 'date-fns';
import { formatDateToString } from '@/utils';

const getDefaultSevenDayLater = (next = 0) => {
  const WEEK = 7;
  return formatDateToString(addDays(new Date(), WEEK + next));
};

export default getDefaultSevenDayLater;
