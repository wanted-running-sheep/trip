import React from 'react';
import styled from 'styled-components';
import { CounterEnum, PeopleEnum, PeopleType } from '@/types/enum';
import { GuestActionType } from '@/types/guest';

const couterRule = {
  adults: {
    min: 1,
    max: 8,
  },
  children: {
    min: 0,
    max: 8,
  },
};
interface GuestCounterType {
  count: number;
  dispatch: React.Dispatch<GuestActionType>;
  name: PeopleType;
}
const GuestCounter = ({ count, dispatch, name }: GuestCounterType) => {
  return (
    <Wrapper>
      <span>{PeopleEnum[name].name}</span>
      <div>
        <CounterButton
          onClick={() => dispatch({ type: CounterEnum.DECREMENT, name })}
          disabled={count <= couterRule[name].min}
        >
          -
        </CounterButton>
        <CountText maxFlag={count >= couterRule[name].max}>{count}</CountText>
        <CounterButton
          onClick={() => dispatch({ type: CounterEnum.INCREMENT, name })}
          disabled={count >= couterRule[name].max}
        >
          +
        </CounterButton>
      </div>
    </Wrapper>
  );
};

export default GuestCounter;

const Wrapper = styled.div`
  ${({ theme }) => theme.mixins.flexBox('center', 'space-between')};
  margin-top: 10px;
  height: 50px;
  font-size: 0.9rem;
`;
const CountText = styled.span<{ maxFlag?: boolean }>`
  color: ${({ theme, maxFlag }) => maxFlag && theme.color.font.red};
  margin: 0px 15px;
  font-size: 1rem;
  font-weight: 600;
`;
const CounterButton = styled.button`
  background: transparent;
  border: 1px solid ${({ theme }) => theme.color.border.black};
  border-radius: 3px;
  width: 20px;
  &:disabled {
    border: 1px solid ${({ theme }) => theme.color.border.lightgray};
    cursor: not-allowed;
  }
`;
