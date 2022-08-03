import React, { useRef } from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';

import { Search } from '@/assets/icons';
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
    <>
      <Search />
      <input
        ref={inputRef}
        type={type}
        placeholder={placeholder}
        onBlur={inputSearchKeyword}
      />
    </>
  );
};

export default Input;
