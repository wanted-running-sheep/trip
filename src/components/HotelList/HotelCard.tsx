import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';

import { getHotelImage } from '@/utils';
import useReservation from '@/hooks/useReservation';
import { RESERVATION_BUTTON_LABEL } from '@/constants';
import { SkeletonItem } from '@/components';
import { People } from '@/assets/icons';
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
        <img alt="hotel-image" src={getHotelImage(hotelName)} />
      </ImgWrapper>
      <InfoArea>
        <div>
          <RoundedTag>5.0성급</RoundedTag>
          <H2>{hotelName}</H2>
          <P>부산광역시 부산진구 서면로 20</P>
          <P>
            <People /> {minGuest}인 {maxGuest !== minGuest && `~ ${maxGuest}인`}
          </P>
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
  ${({ theme }) => theme.mixins.boxShadow(0.03)}
  margin-top: 10px;
  border: 1px solid ${({ theme }) => theme.color.border.lightgray};
  border-radius: 5px;
  display: flex;

  &:hover {
    ${({ theme }) => theme.mixins.boxShadow(0.3)}
  }
`;

const ImgWrapper = styled.div`
  height: 215px;

  img {
    width: 164px;
    height: 100%;
    object-fit: cover;
    border-radius: 5px 0 0 5px;
  }
`;

const InfoArea = styled.div`
  width: 100%;
  padding: 20px;

  ${({ theme }) => theme.mixins.flexBox('', 'space-between')}
`;

const RoundedTag = styled.p`
  width: 52px;
  padding: 2px 4px;
  border: 1px solid ${({ theme }) => theme.color.border.black};
  border-radius: 3px;
  font-size: 0.8rem;
  margin-bottom: 7px;
`;
const H2 = styled.h2`
  font-size: 1.4rem;
  font-weight: 900;
  margin-bottom: 4px;
`;
const P = styled.p`
  ${({ theme }) => theme.mixins.flexBox('center', '')}
  margin-bottom: 15px;
  font-size: 0.9rem;

  svg {
    margin-right: 5px;
  }
`;

const ButtonWrapper = styled.div`
  ${({ theme }) => theme.mixins.flexBox('center', 'flex-end')}
  flex-direction: column;
`;

const buttonStyleForReservation = css`
  background-color: ${({ theme }) => theme.color.background.darkgray};
  cursor: not-allowed;
`;

const Button = styled.button<{ isReserved: boolean }>`
  background-color: ${({ theme }) => theme.color.background.red};
  color: ${({ theme }) => theme.color.font.white};
  border-radius: 20px;
  padding: 7px 20px;
  min-width: 91px;
  ${({ isReserved }) => {
    if (isReserved) {
      return buttonStyleForReservation;
    }
  }}
  &:hover {
    transform: scale(0.95);
  }
`;
