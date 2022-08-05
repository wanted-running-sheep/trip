import React, { useRef, useReducer } from 'react';
import styled, { css } from 'styled-components';
import { useSetRecoilState } from 'recoil';

import { Search as SearchIcon } from '@/assets/icons';
import {
  SearchInput,
  GuestCountInput,
  CheckInOutCalendar,
  Calendar,
  GuestModal,
} from '@/components';
import { searchFilterState, toggleSearchClickState } from '@/recoil/atoms';
import { CounterEnum } from '@/types/enum';
import { GuestActionType, GuestStateType } from '@/types/guest';
import { useMediaQuery } from 'react-responsive';
import { sizes } from '@/styles/media';

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
  const setToggleSearchClick = useSetRecoilState(toggleSearchClickState);
  const isTablet = useMediaQuery({ maxWidth: sizes.tablet });

  const searchByFilter = () => {
    const keyword = inputRef.current?.value;

    if (keyword !== undefined) {
      setSearchFilter((prevFilter) => ({
        ...prevFilter,
        ...guestState,
        keyword,
      }));
      setToggleSearchClick((prevToggle) => !prevToggle);
    }
  };

  return (
    <Wrapper>
      <Container>
        <SearchInput type="search" placeholder="호텔명 검색" ref={inputRef} />
      </Container>
      <Container>
        <CheckInOutCalendar />
      </Container>
      {isTablet && (
        <CalendarWrapper>
          <Calendar />
        </CalendarWrapper>
      )}
      <Container>
        <GuestCountInput guestState={guestState} dispatch={dispatch} />
      </Container>
      {isTablet && (
        <ModalWrapper>
          <GuestModal guestState={guestState} dispatch={dispatch} />
        </ModalWrapper>
      )}
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
    background: ${({ theme }) => theme.color.button.fluorescentred};
    color: ${({ theme }) => theme.color.font.white};
    width: 50px;
    border-radius: 0px 7px 7px 0;

    ${({ theme }) => theme.media.tablet`
      width: 100%;
      padding: 8px 0;
    `}
  }

  ${({ theme }) => theme.media.tablet`
    flex-direction: column;
    height: 100%;
  `}
`;
const Container = styled.div`
  ${({ theme }) => theme.mixins.flexBox('center', '')};
  flex-grow: 1;
  height: 100%;
  cursor: pointer;
  border-top: 1px solid ${({ theme }) => theme.color.border.gray};
  border-bottom: 1px solid ${({ theme }) => theme.color.border.gray};
  border-right: 1px solid ${({ theme }) => theme.color.border.gray};

  &:first-child {
    border-radius: 7px 0 0 7px;
    border: 1px solid ${({ theme }) => theme.color.border.gray};
  }
  &:hover {
    background-color: ${({ theme }) => theme.color.background.gray};
  }

  svg {
    margin: 0 10px;
  }

  ${({ theme }) => theme.media.tablet`
  padding: 10px 10px;
    margin-bottom: 10px;
    border-left: 1px solid ${theme.color.border.gray};
  `}
`;

const CalendarWrapper = styled.div`
  padding: 0 2px;
  margin-bottom: 20px;
`;

const ModalWrapper = styled.div`
  margin-bottom: 20px;
`;
