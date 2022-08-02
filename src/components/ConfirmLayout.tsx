import React from 'react';
import styled from 'styled-components';
import { Outlet, useNavigate } from 'react-router-dom';
import { logoUrl } from '@/constants';

const ConfirmLayout = () => {
  const navigate = useNavigate();
  return (
    <>
      <Header>
        <HeaderInner>
          <Logo onClick={() => navigate('/')} />
          <h2>예약 확인</h2>
          <ConfirmLink onClick={() => navigate('/')}>돌아가기</ConfirmLink>
        </HeaderInner>
      </Header>
      <Main>
        <Outlet />
      </Main>
    </>
  );
};

export default ConfirmLayout;

const Header = styled.header`
  width: 100%;
  max-width: 976px;
  height: 80px;
  margin: 0 auto;
  ${({ theme }) => theme.media.tablet`
		width: 100%;
	`}
`;

const HeaderInner = styled.div`
  width: 100%;
  height: 100%;
  ${({ theme }) => theme.mixins.flexBox('center', 'space-between')};
  padding: 0 30px;
  h2 {
    font-size: 24px;
    font-weight: bold;
  }
`;

const Logo = styled.div`
  width: 125px;
  height: 31px;
  background: url(${logoUrl}) center center / contain no-repeat;
  cursor: pointer;
`;

const ConfirmLink = styled.div`
  width: 125px;
  font-size: 18px;
  text-align: center;
  cursor: pointer;
  ${({ theme }) => theme.media.mobile`
    width: auto;
	`}
`;

const Main = styled.main`
  width: 100%;
  max-width: 976px;
  height: calc(100% - 100px);
  margin: 0 auto;
  ${({ theme }) => theme.media.tablet`
		width: 100%;
	`}
`;
