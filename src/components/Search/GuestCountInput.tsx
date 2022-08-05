import React, { useState, useReducer } from 'react';
import styled from 'styled-components';

import { Person } from '@/assets/icons';
import { GuestModal } from '@/components';

import { useMediaQuery } from 'react-responsive';
import { sizes } from '@/styles/media';

const GuestCountInput = ({ guestState, dispatch }: any) => {
  const [isOpenAddModal, setIsOpenAddModal] = useState(false);
  const isTablet = useMediaQuery({ maxWidth: sizes.tablet });

  return (
    <Wrapper>
      <Content>
        <Person />
        <div>
          <span>객실 / 인원</span>
          <h1 onClick={() => setIsOpenAddModal(!isOpenAddModal)}>
            객실 1, 인원 {guestState.adults + guestState.children}
          </h1>
        </div>
      </Content>
      {isOpenAddModal && !isTablet && (
        <GuestModal guestState={guestState} dispatch={dispatch} />
      )}
    </Wrapper>
  );
};

export default GuestCountInput;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  cursor: pointer;
`;
const Content = styled.div`
  ${({ theme }) => theme.mixins.flexBox('center', 'center')}
  width: 140px;
  height: 100%;
  position: relative;
  cursor: pointer;
  user-select: none;

  div {
    display: grid;
    align-items: center;
    height: 80%;
    & > span {
      color: ${({ theme }) => theme.color.font.gray};
      font-size: 0.8rem;
    }
  }
`;
