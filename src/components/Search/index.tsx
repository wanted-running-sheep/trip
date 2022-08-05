import React, { useRef, useReducer } from 'react';
import styled from 'styled-components';
import { useSetRecoilState } from 'recoil';

import { Search as SearchIcon } from '@/assets/icons';
import { SearchInput, GuestCountInput, CheckInOutCalendar } from '@/components';
import { searchFilterState } from '@/recoil/atoms';
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

const Search = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [guestState, dispatch] = useReducer(guestReducer, initialState);
  const setSearchFilter = useSetRecoilState(searchFilterState);

  const searchByFilter = () => {
    const keyword = inputRef.current?.value;

    if (keyword !== undefined)
      setSearchFilter((prevFilter) => ({
        ...prevFilter,
        ...guestState,
        keyword,
      }));
  };

  return (
    <Wrapper>
      <Container>
        <SearchInput type="search" placeholder="호텔명 검색" ref={inputRef} />
      </Container>
      <Container>
        <CheckInOutCalendar />
      </Container>
      <Container>
        <GuestCountInput guestState={guestState} dispatch={dispatch} />
      </Container>
      <button onClick={searchByFilter}>
        <SearchIcon color={'#ffffff'} />
      </button>
    </Wrapper>
  );
};

export default Search;
const Wrapper = styled.div`
  display: flex;
  height: 55px;
  margin-bottom: 30px;

  & > button {
    background: ${({ theme }) => theme.color.button.red};
    color: ${({ theme }) => theme.color.font.white};
    width: 50px;
  }
`;
const Container = styled.div`
  ${({ theme }) => theme.mixins.flexBox()};
  flex-grow: 1;
  height: 100%;
  padding: 10px 7px;
  cursor: pointer;
  border-top: 1px solid ${({ theme }) => theme.color.border.gray};
  border-bottom: 1px solid ${({ theme }) => theme.color.border.gray};
  border-right: 1px solid ${({ theme }) => theme.color.border.gray};

  &:first-child {
    border: 1px solid ${({ theme }) => theme.color.border.gray};
  }
  &:hover {
    background-color: ${({ theme }) => theme.color.background.gray};
  }

  svg {
    margin-right: 10px;
  }
`;
