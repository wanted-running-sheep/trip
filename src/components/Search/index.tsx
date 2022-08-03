import React from 'react';
import styled, { css } from 'styled-components';
import { Input, GuestCountInput } from '@/components';
import CalendarInput from '../CheckInOutCalendar';

const Search = () => {
  return (
    <Wrapper>
      <InputContainer>
        <Input type="search" placeholder="호텔명 검색" />
      </InputContainer>
      <CalendarInput />
      <GuestContainer>
        <GuestCountInput />
      </GuestContainer>
    </Wrapper>
  );
};

export default Search;
const Wrapper = styled.section`
  width: 100%;
  height: 60px;
  margin: 0 auto;
  display: flex;
  margin-bottom: 20px;
`;

const InputContainer = styled.div`
  flex-grow: 1;
  height: 100%;
  cursor: pointer;
  border-radius: 4px 0px;
  padding: 10px;
  ${({ theme }) => {
    const border = `1px solid ${theme.color.border.gray}`;
    return css`
      ${theme.mixins.flexBox('center', '')};
      border-top: ${border};
      border-left: ${border};
      border-bottom: ${border};
    `;
  }}
`;

const GuestContainer = styled.div`
  flex-grow: 1;
  height: 100%;
  cursor: pointer;
  padding: 10px;
  ${({ theme }) => {
    const border = `1px solid ${theme.color.border.gray}`;
    return css`
      ${theme.mixins.flexBox('center', '')};
      border-top: ${border};
      border-right: ${border};
      border-bottom: ${border};
    `;
  }}
`;
/* const Wrapper = styled.div`
  height: 40px;
  ${({ theme }) => theme.mixins.flexBox()};

  & > div {
    ${({ theme }) => theme.mixins.flexBox()};
    border: 1px solid ${({ theme }) => theme.color.border.lightgray};
    height: 100%;
    padding: 10px 7px;

    svg {
      margin-right: 7px;
    }
  }
`; */
