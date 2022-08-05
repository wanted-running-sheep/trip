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
    <>
      <Person />
      <Content>
        <span>객실 / 인원</span>
        <h1 onClick={() => setIsOpenAddModal(!isOpenAddModal)}>
          객실 1, 인원 {guestState.adults + guestState.children}
        </h1>
        {isOpenAddModal && !isTablet && (
          <GuestModal guestState={guestState} dispatch={dispatch} />
        )}
      </Content>
    </>
  );
};

export default GuestCountInput;

const Content = styled.div`
  margin-left: 7px;
  width: 130px;
  position: relative;
  cursor: pointer;
  user-select: none;

  & > span {
    color: ${({ theme }) => theme.color.font.gray};
    font-size: 0.8rem;
  }
`;
const Modal = styled.div`
  ${({ theme }) => theme.mixins.boxShadow(0.1)}
  background: ${({ theme }) => theme.color.background.white};
  border: 1px solid ${({ theme }) => theme.color.border.lightgray};
  position: absolute;
  width: 250px;
  padding: 10px 15px;
  border-radius: 5px;

  h1 {
    border-bottom: 1px solid ${({ theme }) => theme.color.border.lightgray};
    padding: 8px 0px;
    font-size: 1.1rem;
  }
`;
