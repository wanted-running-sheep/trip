import React from 'react';
import styled from 'styled-components';
import { CounterEnum, PeopleEnum, PeopleType } from '@/types/enum';
import { GuestActionType } from '@/types/guest';

interface GuestCounterType {
  count: number;
  dispatch: React.Dispatch<GuestActionType>;
  name: PeopleType;
}
const GuestCounter = ({ count, dispatch, name }: GuestCounterType) => {
  return (
    <Wrapper>
      <span>{PeopleEnum[name].name}</span>
      <Counter>
        <button onClick={() => dispatch({ type: CounterEnum.INCREMENT, name })}>
          +
        </button>
        <span>{count}</span>
        <button onClick={() => dispatch({ type: CounterEnum.DECREMENT, name })}>
          -
        </button>
      </Counter>
    </Wrapper>
  );
};

export default GuestCounter;

const Wrapper = styled.div`
  ${({ theme }) => theme.mixins.flexBox('center', 'space-between')};
  margin-top: 10px;
`;
const Counter = styled.div``;
