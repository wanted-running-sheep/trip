import React, { forwardRef } from 'react';
import styled from 'styled-components';
import { Search } from '@/assets/icons';

interface InputProps {
  type: string;
  placeholder?: string;
}
const SearchInput = forwardRef(
  ({ type, placeholder }: InputProps, ref: React.Ref<HTMLInputElement>) => {
    return (
      <>
        <Search />
        <Input ref={ref} type={type} placeholder={placeholder} />
      </>
    );
  }
);
SearchInput.displayName = 'SearchInput';
export default SearchInput;

const Input = styled.input`
  width: 250px;
  font-size: 0.9rem;

  ${({ theme }) => theme.media.tablet`
    width: 100%;
  `}
`;
