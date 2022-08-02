import React from 'react';
import styled from 'styled-components';
import { Outlet, useNavigate } from 'react-router-dom';
import { logoUrl } from '@/constants';

const ReservationLayout = () => {
  const navigate = useNavigate();
  return (
    <>
      <Header>
        <HeaderInner>
          <Logo onClick={() => navigate('/')} />
          <ConfirmLink onClick={() => navigate('/reservation-confirm')}>
            예약 확인
          </ConfirmLink>
        </HeaderInner>
      </Header>
      <Main>
        <Outlet />
      </Main>
    </>
  );
};

export default ReservationLayout;

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
`;

const Logo = styled.div`
  max-width: 125px;
  width: 100%;
  height: 31px;
  background: url(${logoUrl}) center center / contain no-repeat;
  cursor: pointer;
`;

const ConfirmLink = styled.div`
  font-size: 18px;
  cursor: pointer;
`;

const Main = styled.main`
  width: 100%;
  max-width: 976px;
  height: calc(100% - 80px);
  margin: 0 auto;
  ${({ theme }) => theme.media.tablet`
		width: 100%;
	`}
`;
