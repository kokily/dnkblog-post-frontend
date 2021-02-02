import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import OutsideClickHandler from 'react-outside-click-handler';
import { animated } from 'react-spring';
import { CategoryType, MeType } from '../../../libs/types';
import shadow from '../../../style/shadow';
import UserMenuItem from './UserMenuItem';

interface UserMenuProps {
  user: MeType | null;
  onClose: (e: React.MouseEvent) => void;
  onLogout: () => void;
  transition: any;
  categories: CategoryType[];
}

function UserMenu({ user, onClose, onLogout, transition, categories }: UserMenuProps) {
  return (
    <>
      {transition.map(({ item, key, props }) =>
        item ? (
          <OutsideClickHandler key={key} onOutsideClick={onClose}>
            <UserMenuBox onClick={onClose} style={props}>
              <div className="menu-wrapper">
                {user ? (
                  <>
                    <UserMenuItem href={'/profile'}>사용자 프로필</UserMenuItem>

                    <Split />

                    {categories.length !== 0 &&
                      categories.map((category) => (
                        <UserMenuItem
                          key={category.name}
                          href={`/category/${category.name}`}
                        >
                          {category.name} - <small>카테고리</small>
                        </UserMenuItem>
                      ))}

                    <Split />

                    <UserMenuItem onClick={onLogout}>로그아웃</UserMenuItem>
                  </>
                ) : (
                  <>
                    <UserMenuItem href="/login">로그인</UserMenuItem>
                    <Split />

                    {categories.length !== 0 &&
                      categories.map((category) => (
                        <UserMenuItem
                          key={category.name}
                          href={`/category/${category.name}`}
                        >
                          {category.name} - <small>카테고리</small>
                        </UserMenuItem>
                      ))}
                  </>
                )}
              </div>
            </UserMenuBox>
          </OutsideClickHandler>
        ) : null
      )}
    </>
  );
}

export default UserMenu;

// Styles
const UserMenuBox = styled(animated.div)`
  position: absolute;
  top: 100%;
  margin-top: 0.22rem;
  right: 0;
  ${shadow(5)};
  > .menu-wrapper {
    position: relative;
    background: white;
    z-index: 5;
    width: 12rem;
  }
`;

const Split = styled.div`
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  height: 2px;
  background: linear-gradient(to right, ${oc.teal[6]}, ${oc.cyan[5]});
`;

const CategoryTitle = styled.div`
  display: block;
  font-weight: bold;
  color: ${oc.gray[6]};
  text-decoration: none;
  padding-bottom: 0.2rem;
  margin: 0.7rem;
  border-bottom: 1px solid ${oc.gray[6]};
`;
