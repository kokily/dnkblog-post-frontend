import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import { MdArrowDropDown } from 'react-icons/md';

interface MenuProps {
  onClick?: (e: React.MouseEvent) => void;
}

function MenuButton({ onClick }: MenuProps) {
  return (
    <MenuBox onClick={onClick}>
      <img src="/menu.jpeg" alt="" />
      <MdArrowDropDown />
    </MenuBox>
  );
}

export default MenuButton;

// Styles
const MenuBox = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  img {
    display: block;
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    object-fit: cover;
    filter: brightness(75%);
    transition: 0.125s all ease-in;
  }
  svg {
    font-size: 1.5rem;
    padding: 0rem 0 0 0;
    margin-left: 0.05rem;
    color: ${oc.gray[6]};
    transition: 0.125s all ease-in;
    margin-right: -0.4375rem;
  }
  &:hover {
    img {
      filter: brightness(100%);
    }
    svg {
      color: white;
    }
  }
`;
