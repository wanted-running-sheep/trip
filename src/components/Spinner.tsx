import React from 'react';

import styled from 'styled-components';

const Spinner = () => {
  return (
    <SpinnerOverlay>
      <SpinnerContainer />
    </SpinnerOverlay>
  );
};

export default Spinner;

const SpinnerOverlay = styled.div`
  width: 100%;
  ${({ theme }) => theme.mixins.flexBox()}
`;

const SpinnerContainer = styled.div`
  display: inline-block;
  width: 50px;
  height: 50px;
  border: 3px solid ${({ theme }) => theme.color.spinner.gray};
  border-radius: 50%;
  border-top-color: ${({ theme }) => theme.color.spinner.darkgray};
  animation: spin 1s ease-in-out infinite;
  @keyframes spin {
    to {
      -webkit-transform: rotate(360deg);
    }
  }
`;
