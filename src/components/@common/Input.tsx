import React, { useRef } from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';

import { Search } from '@/asset/svg';
import { searchFilterState } from '@/recoil/atoms';

interface InputProps {
  type: string;
  placeholder?: string;
}
const Input = ({ type, placeholder }: InputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchFilter, setSearchFilter] = useRecoilState(searchFilterState);

  const inputSearchKeyword = () => {
    const keyword = inputRef.current?.value;
    if (keyword) setSearchFilter({ ...searchFilter, keyword });
  };

  return (
    <Wrapper>
      <Search />
      <input
        ref={inputRef}
        type={type}
        placeholder={placeholder}
        onBlur={inputSearchKeyword}
      />
    </Wrapper>
  );
};

export default Input;

const Wrapper = styled.div`
  ${({ theme }) => theme.mixins.flexBox()}
  border: 1px solid ${({ theme }) => theme.color.border.lightgray};
  height: 100%;
  padding: 10px 7px;
  border-radius: 5px;

  input {
    margin-left: 7px;
  }
`;
