import React, { useEffect, useState } from 'react';

import { getHotelImage } from '@/utils';

import useReservation from '@/hooks/useReservation';
import { RESERVATION_BUTTON_LABEL } from '@/constants';

import styled, { css } from 'styled-components';
import SkeletonItem from './Skeleton/SkeletonItem';

interface HotelNameProps {
  hotelName: string;
  minGuest: number;
  maxGuest: number;
}

const HotelCard = ({ hotelName, minGuest, maxGuest }: HotelNameProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const { isReserved, saveReservation } = useReservation(hotelName);

  useEffect(() => {
    loadImage();
  }, []);

  const loadImage = () => {
    const image = new Image();
    image.src = getHotelImage();
    image.onload = () => {
      setIsLoading(false);
    };
  };

  const handleReservationButtonClick = () => {
    saveReservation(hotelName);
  };

  const buttonText = isReserved
    ? RESERVATION_BUTTON_LABEL.DISABLED
    : RESERVATION_BUTTON_LABEL.ENABLED;

  if (isLoading) {
    return <SkeletonItem />;
  }

  return (
    <Wrapper>
      <ImgWrapper>
        <Img alt="hotel-image" src={getHotelImage(hotelName)} />
      </ImgWrapper>
      <InfoArea>
        <div>
          <H2>{hotelName}</H2>
          <P>기준투숙인원: {minGuest}인</P>
          <P>최대투숙인원: {maxGuest}인</P>
        </div>
        <ButtonWrapper>
          <Button
            onClick={handleReservationButtonClick}
            isReserved={isReserved}
            disabled={isReserved}
          >
            {buttonText}
          </Button>
        </ButtonWrapper>
      </InfoArea>
    </Wrapper>
  );
};

export default HotelCard;

const Wrapper = styled.div`
  margin-top: 10px;
  border: 1px solid ${({ theme }) => theme.color.border.lightgray};
  border-radius: 4px;
  ${({ theme }) => theme.mixins.boxShadow()}
  display: flex;
`;

const ImgWrapper = styled.div`
  height: 215px;
`;

const Img = styled.img`
  width: 164px;
  height: 215px;
  object-fit: cover;
`;

const InfoArea = styled.div`
  width: 100%;
  padding: 20px;

  ${({ theme }) => theme.mixins.flexBox('', 'space-between')}
`;

const H2 = styled.h2`
  font-size: 1.4rem;
  font-weight: 900;
  margin-bottom: 10px;
`;

const P = styled.p`
  margin-bottom: 10px;
`;

const ButtonWrapper = styled.div`
  ${({ theme }) => theme.mixins.flexBox('center', 'flex-end')}
  flex-direction: column;
`;

const buttonStyleForReservation = css`
  border-color: ${({ theme }) => theme.color.border.lightgray};
  color: ${({ theme }) => theme.color.button.gray};
  cursor: default;
`;

const Button = styled.button<{ isReserved: boolean }>`
  border: 2px solid ${({ theme }) => theme.color.border.red};
  color: ${({ theme }) => theme.color.button.red};
  background-color: ${({ theme }) => theme.color.button.white};
  border-radius: 20px;
  padding: 6px 20px;
  min-width: 91px;
  ${({ isReserved }) => {
    if (isReserved) {
      return buttonStyleForReservation;
    }
  }}
`;
