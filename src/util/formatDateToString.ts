import { format } from 'date-fns';
export const formatDateToString = (
  date: Date,
  formatString: string = 'yyyy-MM-dd'
) => {
  return format(date, formatString);
};
