import React from 'react';
import styled from 'styled-components';
import LeftDirection from '@/assets/icons/LeftDirection';
import RightDirection from '@/assets/icons/RightDirection';
import { format } from 'date-fns';
import { DateFormatEnum } from '@/types/enum';

interface HeaderProps {
  activeMonth: Date;
  onClickMonth: (direction: 1 | -1) => void;
}

const Header = ({ activeMonth, onClickMonth }: HeaderProps) => {
  return (
    <Wrapper>
      <IconContainer onClick={() => onClickMonth(-1)}>
        <LeftDirection />
      </IconContainer>
      <MonthContainer>
        <h2>{format(activeMonth, DateFormatEnum.FORMAT_KOR_MONTH)}</h2>
      </MonthContainer>
      <IconContainer onClick={() => onClickMonth(1)}>
        <RightDirection />
      </IconContainer>
    </Wrapper>
  );
};

export default Header;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    border-radius: 50%;
    background-color: ${({ theme }) => theme.color.background.gray};
  }
`;

const MonthContainer = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: center;
`;
