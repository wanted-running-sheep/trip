import React, { useEffect, useState } from 'react';
import { getHotelImage } from '@/utils';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { reservedHotelState } from '@/recoil/atoms';

interface HotelCardReservedProps {
  hotelName: string;
  checkIn: string;
}

const HotelCardReserved = ({ hotelName, checkIn }: HotelCardReservedProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [reservedHotel, setReservedHotel] = useRecoilState(
    reservedHotelState(hotelName)
  );

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
    return <></>;
  }

  return (
    <Wrapper>
      <ImgWrapper>
        <Img alt="hotel-image" src={getHotelImage(hotelName)} />
      </ImgWrapper>
      <InfoArea>
        <div>
          <H2>{hotelName}</H2>
          <P>체크인: {checkIn}</P>
          {/* <P>체크아웃: {checkOut}</P>
          <P>어른: {adults}</P>
          <P>아이: {children}</P> */}
        </div>
        <ButtonWrapper>
          <Button>예약</Button>
        </ButtonWrapper>
      </InfoArea>
    </Wrapper>
  );
};

export default HotelCardReserved;

const Wrapper = styled.div`
  margin-bottom: 10px;
  border: 1px solid gray;
  border-radius: 4px;

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
