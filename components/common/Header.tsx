import React, { useCallback, useRef } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import oc from 'open-color';
import { MdImageAspectRatio } from 'react-icons/md';
import { MeType } from '../../libs/types';
import useToggle from '../../libs/hooks/useToggle';
import { media } from '../../style/media';
import shadow from '../../style/shadow';
import UserMenuContainer from '../../containers/common/menu/UserMenuContainer';
import MenuButton from './menu/MenuButton';

interface HeaderProps {
  user: MeType | null;
  onLogout: () => void;
  onWrite: () => void;
}

function Header({ user, onLogout, onWrite }: HeaderProps) {
  const [menu, toggleMenu] = useToggle(false);
  const ref = useRef<HTMLDivElement>(null);

  const onOutsideClick = useCallback(
    (e: React.MouseEvent) => {
      if (!ref.current) return;
      if (ref.current.contains(e.target as any)) return;

      toggleMenu();
    },
    [toggleMenu]
  );

  return (
    <HeaderBox>
      <Layout>
        <Content>
          <Link href="/">
            <Logo>
              {user ? (
                <ProfileLogo>
                  {user.profile ? (
                    <img src={user.profile} alt="" />
                  ) : (
                    <MdImageAspectRatio />
                  )}
                  <span>{user.username}</span>
                </ProfileLogo>
              ) : (
                <>D&K Dream</>
              )}
            </Logo>
          </Link>

          <Spacer />

          <>
            {user && user.admin && <WriteButton onClick={onWrite}>글 작성</WriteButton>}
            <div ref={ref}>
              <MenuButton onClick={toggleMenu} />
            </div>
            <UserMenuContainer
              user={user}
              onClose={onOutsideClick}
              onLogout={onLogout}
              visible={menu}
            />
          </>
        </Content>
      </Layout>
    </HeaderBox>
  );
}

export default Header;

// Styles
const HeaderBox = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  width: 100%;
  top: 0px;
  z-index: 20;
  ${shadow(1)}
`;

const Layout = styled.div`
  background: black;
  display: flex;
  justify-content: center;
  height: auto;
`;

const Content = styled.div`
  width: 1200px;
  height: 55px;
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
  padding-left: 1rem;
  padding-right: 1rem;
  ${media.large} {
    width: 992px;
  }
  ${media.medium} {
    width: 100%;
  }
`;

const ProfileLogo = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  img,
  svg {
    width: 2.5rem;
    height: auto;
    border-radius: 14px;
    object-fit: cover;
    filter: brightness(85%);
    transition: 0.125s all ease-in;
    margin-right: 0.5rem;
    vertical-align: middle;
  }
  span {
    display: inline-block;
  }
`;

const Logo = styled.a`
  display: flex;
  align-items: center;
  font-size: 1.4rem;
  color: white;
  letter-spacing: 1.1px;
  font-weight: 600;
  cursor: pointer;
  &:hover {
    text-shadow: 0.5px 0.5px;
  }
`;

const Spacer = styled.div`
  flex-grow: 1;
`;

const WriteButton = styled.button`
  height: 2rem;
  margin-right: 1rem;
  padding: 6px 1rem 5px 1rem;
  border-radius: 0.6rem;
  font-size: 1rem;
  border: 1px solid white;
  outline: none;
  cursor: pointer;
  word-break: keep-all;
  background: ${oc.gray[8]};
  color: white;
  transition: 0.15s all;
  &:hover {
    background: white;
    color: black;
  }
  &:active {
    transform: translateY(2px);
  }
`;
