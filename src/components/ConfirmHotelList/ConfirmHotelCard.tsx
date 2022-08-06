import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getHotelImage } from '@/utils';
import { SkeletonItem } from '@/components';
import { removeReservationType } from 'request';
import { Calendar, People } from '@/assets/icons';

interface ConfirmHotelCardProps {
  hotelName: string;
  checkIn: string;
  checkOut: string;
  adults: number;
  childrenParam: number;
  removeReservation: ({
    hotelName,
    checkIn,
    checkOut,
  }: removeReservationType) => void;
}

const ConfirmHotelCard = ({
  hotelName,
  checkIn,
  checkOut,
  adults,
  childrenParam,
  removeReservation,
}: ConfirmHotelCardProps) => {
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
        <img alt="hotel-image" src={getHotelImage(hotelName)} />
      </ImgWrapper>
      <InfoArea>
        <div>
          <H2>{hotelName}</H2>
          <P style={{ marginBottom: '15px' }}>부산광역시 부산진구 서면로 20</P>
          <P>
            <Calendar color="#BABABA" /> {checkIn}{' '}
            {checkIn !== checkOut && `~ ${checkOut}`}
          </P>
          <P>
            <People /> 어른: {adults}
            {childrenParam > 0 && ` / 아이: ${childrenParam}`}
          </P>
        </div>
        <ButtonWrapper>
          <Button
            onClick={() => removeReservation({ hotelName, checkIn, checkOut })}
          >
            취소
          </Button>
        </ButtonWrapper>
      </InfoArea>
    </Wrapper>
  );
};

export default ConfirmHotelCard;

const Wrapper = styled.div`
  ${({ theme }) => theme.mixins.boxShadow(0.03)}
  margin-top: 10px;
  border: 1px solid ${({ theme }) => theme.color.border.lightgray};
  border-radius: 5px;
  display: flex;
  width: 100%;

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

    ${({ theme }) => theme.media.mobile`
      width: 120px;
    `}
  }
`;

const InfoArea = styled.div`
  width: 100%;
  padding: 20px;

  ${({ theme }) => theme.mixins.flexBox('', 'space-between')}

  ${({ theme }) => theme.media.mobile`
    width: calc(100% - 120px);
    ${theme.mixins.flexBox('right', 'space-between')};
    flex-direction: column;
  `}
`;
const H2 = styled.h2`
  font-size: 1.4rem;
  font-weight: 900;
  margin-bottom: 8px;
  ${({ theme }) => theme.media.mobile`
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  `}
`;
const P = styled.p`
  ${({ theme }) => theme.mixins.flexBox('center', '')}
  font-size: 0.9rem;
  margin-bottom: 5px;

  svg {
    margin-right: 7px;
    width: 15px;
    height: 15px;
  }
`;

const ButtonWrapper = styled.div`
  ${({ theme }) => theme.mixins.flexBox('center', 'flex-end')}
  flex-direction: column;
  ${({ theme }) => theme.media.mobile`
    ${theme.mixins.flexBox('flex-end', 'right')}
  `}
`;
const Button = styled.button`
  background-color: ${({ theme }) => theme.color.background.red};
  color: ${({ theme }) => theme.color.font.white};
  border-radius: 20px;
  padding: 7px 20px;
  min-width: 91px;
  &:hover {
    transform: scale(0.95);
  }
`;
