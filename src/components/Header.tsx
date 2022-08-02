import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import { logoUrl } from '@/constants';
import Menu from '@/assets/icons/Menu';

const Header = () => {
  const navigate = useNavigate();
  const [isMountedMenu, setIsMountedMenu] = useState(false);

  const onToggleMenu = () => {
    setIsMountedMenu((prevToggle) => !prevToggle);
  };

  return (
    <HeaderInner>
      <Logo onClick={() => navigate('/main')} />
      <MenuList>
        <Item onClick={() => navigate('/main')}>예약하기</Item>
        <Item onClick={() => navigate('/reservation-confirm')}>예약 확인</Item>
      </MenuList>
      <MobileMenuList onClick={onToggleMenu}>
        <Menu />
        {isMountedMenu && (
          <List>
            <Item onClick={() => navigate('/main')}>예약하기</Item>
            <Item onClick={() => navigate('/reservation-confirm')}>
              예약 확인
            </Item>
          </List>
        )}
      </MobileMenuList>
    </HeaderInner>
  );
};

export default Header;

const HeaderInner = styled.div`
  width: 100%;
  height: 80px;
  ${({ theme }) => theme.mixins.flexBox('center', 'space-between')};
  padding: 0 30px;
  h2 {
    font-size: 24px;
    font-weight: bold;
  }
`;

const Logo = styled.a`
  max-width: 125px;
  width: 100%;
  height: 31px;
  background: url(${logoUrl}) center center / contain no-repeat;
  cursor: pointer;
`;

const MenuList = styled.div`
  ${({ theme }) => theme.mixins.flexBox()};
  ${({ theme }) => theme.media.mobile`
    display:none;
  `}
`;

const Item = styled.div`
  width: 100px;
  height: 30px;
  line-height: 30px;
  font-size: 18px;
  text-align: center;
  cursor: pointer;
  &:first-child {
    ${({ theme }) => theme.media.mobile`
      border-bottom: 1px solid ${theme.color.border.lightgray};
    `}
  }
`;

const List = styled.div`
  position: absolute;
  right: 0;
  background-color: ${({ theme }) => theme.color.background.white};
  border: 1px solid ${({ theme }) => theme.color.border.lightgray};
`;

const MobileMenuList = styled.div`
  display: none;
  ${({ theme }) => theme.media.mobile`
    position: relative;
    display: block;
    cursor: pointer;
  `}
`;
