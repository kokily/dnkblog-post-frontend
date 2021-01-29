import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import oc from 'open-color';
import shadow from '../../style/shadow';

interface AuthFormProps {
  mode: 'login' | 'register';
  email: string;
  username?: string;
  password: string;
  passwordConfirm?: string;
  onSubmit: (e: React.MouseEvent) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

function AuthForm({
  mode,
  email,
  username,
  password,
  passwordConfirm,
  onSubmit,
  onChange,
  onKeyPress,
}: AuthFormProps) {
  const text = mode === 'login' ? '로그인' : '회원가입';

  return (
    <>
      <InputGroup>
        <Input type="text" name="email" value={email} onChange={onChange} required />
        <span className="bar" />
        <label>이메일</label>
      </InputGroup>

      {mode === 'register' && (
        <InputGroup>
          <Input
            type="text"
            name="username"
            value={username}
            onChange={onChange}
            required
          />
          <span className="bar" />
          <label>아이디</label>
        </InputGroup>
      )}

      <InputGroup>
        <Input
          type="password"
          name="password"
          value={password}
          onChange={onChange}
          onKeyPress={onKeyPress}
          required
        />
        <span className="bar" />
        <label>비밀번호</label>
      </InputGroup>

      {mode === 'register' && (
        <InputGroup>
          <Input
            type="password"
            name="passwordConfirm"
            value={passwordConfirm}
            onChange={onChange}
            onKeyPress={onKeyPress}
            required
          />
          <label>비밀번호 확인</label>
        </InputGroup>
      )}

      <Button onClick={onSubmit}>
        <div className="layer">어서오세용!</div>
        {text}
      </Button>

      <RightMenu>
        {mode === 'login' ? (
          <Link href={'/register'}>
            <LinkButton>회원가입</LinkButton>
          </Link>
        ) : (
          <Link href={'/login'}>
            <LinkButton>로그인</LinkButton>
          </Link>
        )}
      </RightMenu>

      <hr />

      <SocialLink>
        <a
          href={`https://github.com/login/oauth/authorize?client_id=3260375f9e6dd0827621&scope=user`}
        >
          <img className="github" src="/GitHub-Mark-32px.png" alt="Github" />
        </a>
        <a href="http://localhost:4000/social/google/login">
          <img className="google" src="/google1.png" alt="Google" />
        </a>
      </SocialLink>
    </>
  );
}

export default AuthForm;

// Styles
const InputGroup = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 30px;
  label {
    position: absolute;
    color: ${oc.cyan[9]};
    top: 12px;
    left: 0;
    transition: 0.2s ease all;
  }
  .bar {
    position: relative;
    display: block;
    width: 100%;
    &:before {
      content: '';
      position: absolute;
      left: 50%;
      right: 50%;
      bottom: 0;
      background: ${oc.cyan[7]};
      height: 3px;
      transition: left 0.2s ease-out, right 0.2s ease-out;
    }
  }
`;

const Input = styled.input`
  border: none;
  border-bottom: 1px solid ${oc.cyan[6]};
  padding: 10px;
  display: block;
  width: 92%;
  &:focus {
    outline: none;
  }
  &:focus ~ label,
  &:valid ~ label {
    top: -10px;
    font-size: 14px;
    font-weight: bold;
    color: ${oc.cyan[6]};
  }
  &:focus ~ .bar:before {
    left: 0;
    right: 0;
  }
`;

const Button = styled.button`
  position: relative;
  display: block;
  overflow: hidden;
  width: 100%;
  margin-top: 1rem;
  padding-top: 0.6rem;
  padding-bottom: 0.5rem;
  font-size: 1.25rem;
  font-weight: 600;
  cursor: pointer;
  user-select: none;
  background: transparent;
  color: ${oc.cyan[5]};
  border: 1px solid ${oc.cyan[5]};
  border-radius: 4px;
  outline: none;
  transition: all 0.5s ease;
  .layer {
    color: white;
    position: absolute;
    left: 0;
    top: -70px;
    width: 100%;
    padding: 10px 0;
    background: ${oc.cyan[5]};
    transition: all 0.4s ease;
  }
  &:hover .layer {
    top: 0;
  }
`;

const RightMenu = styled.div`
  margin-top: 1rem;
  text-align: right;
`;

const LinkButton = styled.a`
  color: ${oc.gray[6]};
  cursor: pointer;
  &:hover {
    color: ${oc.gray[7]};
  }
`;

const SocialLink = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 1rem;
  margin-bottom: -1rem;
  .github {
    margin-right: 1.5rem;
    opacity: 50%;
    transition: 0.2s all;
    &:hover {
      opacity: 1;
    }
  }
  .google {
    width: 34px;
    height: 34px;
    padding: 0;
    margin: 0;
    opacity: 50%;
    transition: 0.2s all;
    &:hover {
      opacity: 1;
    }
  }
`;
