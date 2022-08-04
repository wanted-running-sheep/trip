import React, { useState, useReducer } from 'react';
import styled from 'styled-components';

import { Person } from '@/assets/icons';
import { GuestCounter } from '@/components';

const GuestCountInput = ({ guestState, dispatch }: any) => {
  const [isOpenAddModal, setIsOpenAddModal] = useState(false);

  return (
    <>
      <Person />
      <Content onBlur={() => setIsOpenAddModal(false)} tabIndex={0}>
        <span>객실 / 인원</span>
        <h1 onClick={() => setIsOpenAddModal(!isOpenAddModal)}>
          객실 1, 인원 {guestState.adults + guestState.children}
        </h1>
        {isOpenAddModal && (
          <Modal>
            <h1>객실</h1>
            <GuestCounter
              count={guestState.adults}
              dispatch={dispatch}
              name="adults"
            />
            <GuestCounter
              count={guestState.children}
              dispatch={dispatch}
              name="children"
            />
          </Modal>
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
  background: ${({ theme }) => theme.color.background.white};
  position: absolute;
  width: 250px;
  padding: 10px 7px;
  border: 1px solid ${({ theme }) => theme.color.border.lightgray};

  h1 {
    border-bottom: 1px solid ${({ theme }) => theme.color.border.lightgray};
  }
`;
