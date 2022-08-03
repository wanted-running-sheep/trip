import { format } from 'date-fns';
const formatDateToString = (
  date: Date,
  formatString: string = 'yyyy-MM-dd'
) => {
  return format(date, formatString);
};

export default formatDateToString;
