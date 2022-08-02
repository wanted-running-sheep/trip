import React from 'react';
import styled from 'styled-components';
import { Outlet } from 'react-router-dom';

import Header from './Header';

const Layout = () => {
  return (
    <Wrapper>
      <Header />
      <Main>
        <Outlet />
      </Main>
    </Wrapper>
  );
};

export default Layout;

const Wrapper = styled.div`
  width: 100%;
  max-width: 976px;
  margin: 0 auto;
`;

const Main = styled.main`
  width: 100%;
  height: calc(100% - 80px);
`;
