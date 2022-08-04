import React, { useRef, useReducer } from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';

import { Search as SearchIcon } from '@/assets/icons';
import { SearchInput, GuestCountInput } from '@/components';
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
  const [searchFilter, setSearchFilter] = useRecoilState(searchFilterState);

  const searchByFilter = () => {
    const keyword = inputRef.current?.value;

    if (keyword !== undefined)
      setSearchFilter({ ...searchFilter, ...guestState, keyword });
  };

  return (
    <Wrapper>
      <div>
        <SearchInput type="search" placeholder="호텔명 검색" ref={inputRef} />
      </div>
      <div>
        <GuestCountInput guestState={guestState} dispatch={dispatch} />
      </div>
      <button onClick={searchByFilter}>
        <SearchIcon color={'#ffffff'} />
      </button>
    </Wrapper>
  );
};

export default Search;
const Wrapper = styled.div`
  display: flex;
  height: 50px;
  margin-bottom: 30px;

  & > div {
    ${({ theme }) => theme.mixins.flexBox()};
    border: 1px solid ${({ theme }) => theme.color.border.lightgray};
    height: 100%;
    padding: 10px 7px;

    &:hover {
      background: ${({ theme }) => theme.color.background.lightgray};
    }
    svg {
      margin-right: 10px;
    }
  }

  & > button {
    background: ${({ theme }) => theme.color.button.red};
    color: ${({ theme }) => theme.color.font.white};
    width: 50px;
  }
`;
