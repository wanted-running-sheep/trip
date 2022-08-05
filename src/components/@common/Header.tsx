import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import { Menu } from '@/assets/icons';
import { LOGO_URL } from '@/constants/logo';
import { NavigateEnum } from '@/types/enum';
import { MenuItemsProps } from '@/types/headerMenu';

const Header = () => {
  const navigate = useNavigate();
  const [isMountedMenu, setIsMountedMenu] = useState(false);

  const menuItems: MenuItemsProps[] = [
    {
      title: '🏠 호텔 목록',
      onClickLink: () => navigate(NavigateEnum.MAIN),
    },
    {
      title: '📋 예약 확인',
      onClickLink: () => navigate(NavigateEnum.CONFIRM),
    },
  ];

  const onToggleMenu = () => {
    setIsMountedMenu((prevToggle) => !prevToggle);
  };

  return (
    <HeaderInner>
      <Wrapper>
        <Logo onClick={() => navigate('/')} />
        <MenuList>
          {menuItems.map((menuItem, index) => (
            <Item key={index} onClick={menuItem.onClickLink}>
              {menuItem.title}
            </Item>
          ))}
        </MenuList>
        <MobileMenuList onClick={onToggleMenu}>
          <Menu />
          {isMountedMenu && (
            <List>
              {menuItems.map((menuItem, index) => (
                <Item key={index} onClick={menuItem.onClickLink}>
                  {menuItem.title}
                </Item>
              ))}
            </List>
          )}
        </MobileMenuList>
      </Wrapper>
    </HeaderInner>
  );
};

export default Header;

const HeaderInner = styled.div`
  background: ${({ theme }) => theme.color.background.white};
  ${({ theme }) => theme.mixins.boxShadow(0.03)};
  ${({ theme }) => theme.mixins.flexBox('center', 'space-between')};
  width: 100vw;
  height: 80px;
  margin-bottom: 30px;

  h2 {
    font-size: 24px;
    font-weight: bold;
  }
`;
const Wrapper = styled.div`
  ${({ theme }) => theme.mixins.flexBox('center', 'space-between')};
  padding: 0 30px;
  box-sizing: border-box;
  width: 976px;
  margin: 0 auto;

  ${({ theme }) => theme.media.mobile`
    padding: 0 15px;
  `}
`;

const Logo = styled.a`
  /* width: 100%; */
  width: 120px;
  height: 31px;
  background: url(${LOGO_URL}) center center / contain no-repeat;
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
  font-size: 14px;
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
