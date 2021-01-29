import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import oc from 'open-color';

interface UserMenuItemProps {
  href?: string;
  red?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}

function UserMenuItem({ href, onClick, children }: UserMenuItemProps) {
  const jsx = <ItemBox onClick={onClick}>{children}</ItemBox>;

  return href ? (
    <Link href={href}>
      <WrapperLink style={{ display: 'block' }}>{jsx}</WrapperLink>
    </Link>
  ) : (
    jsx
  );
}

export default UserMenuItem;

// Styles
const WrapperLink = styled.a`
  display: block;
  color: inherit;
  text-decoration: none;
`;

const ItemBox = styled.div<UserMenuItemProps>`
  padding: 0.75rem 1rem;
  font-weight: 500;
  line-height: 1.5;
  color: ${oc.gray[9]};
  cursor: pointer;
  &:hover {
    background: ${oc.teal[1]};
  }
`;
