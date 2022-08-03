import { HOTEL_IMAGE_URL } from '@/constants';

const getHotelImage = (hotelName = '') => {
  return `${HOTEL_IMAGE_URL}${hotelName}`;
};

export default getHotelImage;
