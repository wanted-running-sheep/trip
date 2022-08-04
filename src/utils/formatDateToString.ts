import { DateFormatEnum } from '@/types/enum';
import { format } from 'date-fns';
const formatDateToString = (
  date: Date,
  formatString: string = DateFormatEnum.DEFAULT_FORMAT
) => {
  return format(date, formatString);
};

export default formatDateToString;
