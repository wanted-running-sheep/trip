import React from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';

import { searchFilterState } from '@/recoil/atoms';
import { CounterEnum, PeopleEnum, PeopleType } from '@/types/enum';

interface PeopleCounterType {
  dispatch: any;
  name: PeopleType;
}
const PeopleCounter = ({ dispatch, name }: PeopleCounterType) => {
  const [searchFilter] = useRecoilState(searchFilterState);

  return (
    <Wrapper>
      <span>{PeopleEnum[name].name}</span>
      <Counter>
        <button onClick={() => dispatch({ type: CounterEnum.INCREMENT, name })}>
          +
        </button>
        <span>{searchFilter[name]}</span>
        <button onClick={() => dispatch({ type: CounterEnum.DECREMENT, name })}>
          -
        </button>
      </Counter>
    </Wrapper>
  );
};

export default PeopleCounter;

const Wrapper = styled.div`
  ${({ theme }) => theme.mixins.flexBox('center', 'space-between')};
  margin-top: 10px;
`;
const Counter = styled.div``;
