import React from 'react';
import Link from 'next/link';
import styled, { createGlobalStyle } from 'styled-components';
import oc from 'open-color';
import shadow from '../../style/shadow';

interface AuthProps {
  mode: 'login' | 'register';
  children: React.ReactNode;
}

function AuthTemplate({ mode, children }: AuthProps) {
  return (
    <>
      <AuthGlobalStyle />

      <AuthBox>
        <LogoBox>
          <Link href="/">{mode === 'login' ? '로그인' : '회원가입'}</Link>
        </LogoBox>

        <Content>{children}</Content>
      </AuthBox>
    </>
  );
}

export default AuthTemplate;

// Styles
const AuthGlobalStyle = createGlobalStyle`
  body {
    background: ${oc.gray[6]};
  }
`;

const AuthBox = styled.div`
  position: absolute;
  width: 320px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  ${shadow(1)};
  animation: 0.5s ease-out 0s 1 fadeIn;
  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;

const LogoBox = styled.div`
  background: ${oc.cyan[5]};
  height: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  a {
    color: white;
    font-size: 2.4rem;
    font-weight: 800;
    text-decoration: none;
    letter-spacing: 2px;
  }
`;

const Content = styled.div`
  background: white;
  padding: 2rem;
  height: auto;
`;
