import React, { useState, useReducer, useEffect } from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';

import { Person } from '@/assets/icons';
import { searchFilterState } from '@/recoil/atoms';
import { GuestCounter } from '@/components';
import { CounterEnum } from '@/types/enum';
import { GuestActionType, GuestStateType } from '@/types/guest';

const initialState = { adults: 2, children: 0 };
const guestReducer = (state: GuestStateType, action: GuestActionType) => {
  switch (action.type) {
    case CounterEnum.INCREMENT:
      return {
        ...state,
        [action.name]: state[action.name] + 1,
      };
    case CounterEnum.DECREMENT:
      return {
        ...state,
        [action.name]: state[action.name] - 1,
      };
    default:
      return state;
  }
};

const GuestCountInput = () => {
  const [isOpenAddModal, setIsOpenAddModal] = useState(false);
  const [guestState, dispatch] = useReducer(guestReducer, initialState);
  const [searchFilter, setSearchFilter] = useRecoilState(searchFilterState);

  useEffect(() => {
    setSearchFilter({ ...searchFilter, ...guestState });
  }, [guestState]);

  return (
    <>
      <Person />
      <Content>
        <span>객실 / 인원</span>
        <h1 onClick={() => setIsOpenAddModal(!isOpenAddModal)}>
          객실 1, 인원 {guestState.adults + guestState.children}
        </h1>
        {isOpenAddModal && (
          <Modal>
            <h1>객실</h1>
            <GuestCounter dispatch={dispatch} name="adults" />
            <GuestCounter dispatch={dispatch} name="children" />
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
  position: absolute;
  bottom: -100px;
  width: 250px;
  padding: 10px 7px;
  border: 1px solid ${({ theme }) => theme.color.border.lightgray};

  h1 {
    border-bottom: 1px solid ${({ theme }) => theme.color.border.lightgray};
  }
`;
