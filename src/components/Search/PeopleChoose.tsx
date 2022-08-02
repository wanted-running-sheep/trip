import React, { useState, useReducer, useEffect } from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';

import { Person } from '@/asset/svg';
import { CounterEnum } from '@/types/enum';
import { searchFilterState } from '@/recoil/atoms';
import { PeopleCounter } from '@/components';

const initialState = { adults: 2, children: 0 };
const peopleReducer = (state: any, action: any) => {
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

const PeopleChoose = () => {
  const [isOpenAddModal, setIsOpenAddModal] = useState(false);
  const [peopleState, dispatch] = useReducer(peopleReducer, initialState);
  const [searchFilter, setSearchFilter] = useRecoilState(searchFilterState);

  useEffect(() => {
    setSearchFilter({ ...searchFilter, ...peopleState });
  }, [peopleState]);

  return (
    <>
      <Person />
      <Content>
        <span>객실 / 인원</span>
        <h1 onClick={() => setIsOpenAddModal(!isOpenAddModal)}>
          객실 1, 인원 {peopleState.adults + peopleState.children}
        </h1>
        {isOpenAddModal && (
          <Modal>
            <h1>객실</h1>
            <PeopleCounter dispatch={dispatch} name="adults" />
            <PeopleCounter dispatch={dispatch} name="children" />
          </Modal>
        )}
      </Content>
    </>
  );
};

export default PeopleChoose;

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
