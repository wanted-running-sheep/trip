import { differenceInCalendarDays } from 'date-fns';

const getNights = (checkIn: string, checkOut: string) => {
  const nights = differenceInCalendarDays(
    new Date(checkOut),
    new Date(checkIn)
  );

  return nights && nights > 0 ? nights : 1;
};

export default getNights;
