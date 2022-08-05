import React from 'react';
import styled from 'styled-components';

import { GuestCounter } from '@/components';

const GuestModal = ({ guestState, dispatch }: any) => {
  return (
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
  );
};

export default GuestModal;

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

  ${({ theme }) => theme.media.tablet`
    position: static;
    width: 100%;
  `}
`;
