import React from 'react';
import styled from 'styled-components';
import { Input, GuestCountInput } from '@/components';

const Search = () => {
  return (
    <Wrapper>
      <div>
        <Input type="search" placeholder="호텔명 검색" />
      </div>
      <div>
        <GuestCountInput />
      </div>
    </Wrapper>
  );
};

export default Search;
const Wrapper = styled.div`
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
`;
