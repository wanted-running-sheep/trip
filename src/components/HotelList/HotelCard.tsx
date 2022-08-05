import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { getHotelImage } from '@/utils';
import { SkeletonItem } from '@/components';

interface HotelNameProps {
  hotelName: string;
  minGuest: number;
  maxGuest: number;
}

const HotelCard = ({ hotelName, minGuest, maxGuest }: HotelNameProps) => {
  const [isLoading, setIsLoading] = useState(true);

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
          <Button>예약</Button>
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

const Button = styled.button`
  border: 2px solid red;
  color: ${({ theme }) => theme.color.button.red};
  background-color: ${({ theme }) => theme.color.button.white};
  border-radius: 20px;
  padding: 6px 20px;
  min-width: 76px;
`;
