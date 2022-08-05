import React from 'react';
import useconfirm from '@/hooks/useconfirm';
import ConfirmHotelCard from './ConfirmHotelCard';
import { ReservedHotelAddNameInterface, ReservedHotelInterface } from 'request';

type removeReservationType = Omit<
  ReservedHotelAddNameInterface,
  'adults' | 'children'
>;

const ConfirmHotelList = () => {
  const { reservedHotels, setReservedHotels } = useconfirm();

  const removeReservation = ({
    hotelName,
    checkIn,
    checkOut,
  }: removeReservationType) => {
    const selectedHotel: ReservedHotelInterface[] = JSON.parse(
      localStorage.getItem(hotelName) as string
    );
    const filterSelectedHotel: ReservedHotelInterface[] = selectedHotel.filter(
      (hotel: ReservedHotelInterface) =>
        !(hotel.checkIn === checkIn && hotel.checkOut === checkOut)
    );
    localStorage.setItem(hotelName, JSON.stringify(filterSelectedHotel));
    if (filterSelectedHotel.length === 0) localStorage.removeItem(hotelName);

    const filterReservations = reservedHotels.filter(
      (hotel) =>
        !(
          hotel.hotelName === hotelName &&
          hotel.checkIn === checkIn &&
          hotel.checkOut === checkOut
        )
    );
    setReservedHotels(filterReservations);
  };

  return (
    <>
      {reservedHotels.map((hotel, index) => (
        <ConfirmHotelCard
          key={index}
          hotelName={hotel.hotelName}
          checkIn={hotel.checkIn}
          checkOut={hotel.checkOut}
          adults={hotel.adults}
          childrenParam={hotel.children}
          removeReservation={removeReservation}
        />
      ))}
    </>
  );
};

export default ConfirmHotelList;
