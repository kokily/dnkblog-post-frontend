import React from 'react';
import Link from 'next/link';
import styled, { css } from 'styled-components';
import oc from 'open-color';
import { CountType, MeType } from '../../libs/types';

interface UserProps {
  image?: string;
}

interface ProfileProps {
  user: MeType;
  email: string | null;
  profile: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onProfileUpload: () => void;
  toggle: boolean;
  onToggle: () => void;
  onSubmit: (e: React.MouseEvent) => void;
  count: CountType | null;
}

function Profile({
  user,
  email,
  profile,
  onChange,
  onProfileUpload,
  toggle,
  onToggle,
  onSubmit,
  count,
}: ProfileProps) {
  let profileImage;

  if (user?.profile === '' && profile === '') {
    profileImage = '/background.jpg';
  } else if (user?.profile !== '' && profile === '') {
    profileImage = user.profile;
  } else if (user?.profile === '' && profile !== '') {
    profileImage = profile;
  } else {
    profileImage = user?.profile;
  }

  return (
    <ProfileBox>
      {user && (
        <>
          <UserProfile image={profileImage}>
            {profile === '' && (
              <>
                <h3>
                  프로필: <Button onClick={onProfileUpload}>사진 등록</Button>
                </h3>
              </>
            )}
            <h3>{user.username}</h3>
            {user.email ? (
              <p>이메일 {user.email}</p>
            ) : (
              <p>
                이메일:{' '}
                {toggle ? (
                  <input
                    type="text"
                    name="email"
                    value={email}
                    onChange={onChange}
                    placeholder="Email 입력"
                    autoFocus
                  />
                ) : (
                  <Button onClick={onToggle}>등 록</Button>
                )}
              </p>
            )}
          </UserProfile>

          <Link href="/comment" passHref={true}>
            <UserInfo>
              <li>
                <h3>{count.comments_num}</h3>
                <small>댓 글</small>
              </li>
              <li>
                <h3>{count.replies_num}</h3>
                <small>대댓글</small>
              </li>
            </UserInfo>
          </Link>

          <SubmitButton onClick={onSubmit}>저장하기</SubmitButton>
        </>
      )}
    </ProfileBox>
  );
}

export default Profile;

// Styles
const ProfileBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const UserProfile = styled.div<UserProps>`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  margin-top: 3rem;
  width: 300px;
  height: 300px;
  z-index: 3;
  h3 {
    margin: 0;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: ${oc.blue[4]};
  }
  p {
    font-weight: 300;
    margin: 10px 0 15px;
  }
  input {
    border: none;
    outline: none;
    border-radius: 4px;
    padding: 0.3rem;
  }
  ${(props) =>
    props.image &&
    css`
      background-image: url(${props.image});
      background-repeat: no-repeat;
      background-size: cover;
      border-radius: 5px;
      box-shadow: 0 15px 55px rgba(255, 255, 255, 0.5);
      color: white;
    `}
`;

const UserInfo = styled.ul`
  display: flex;
  justify-content: space-around;
  list-style-type: none;
  width: 80%;
  margin-top: -15px;
  padding: 30px 0 15px;
  background: white;
  color: black;
  border-radius: 5px;
  text-align: center;
  box-shadow: 0 5px 55px rgba(255, 255, 255, 0.5);
  z-index: 2;
  transition: 0.16s all;
  cursor: pointer;
  h3 {
    margin: 0;
  }
  small {
    font-size: 12px;
    font-weight: 100;
    margin: 0;
  }
  &:hover {
    background: ${oc.teal[6]};
    color: white;
    h3,
    small {
      font-weight: bold;
    }
  }
`;

const Button = styled.button`
  height: 2rem;
  margin-right: 1rem;
  padding: 4px 1rem 1px 1rem;
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

const SubmitButton = styled.button`
  width: 60%;
  background: ${oc.indigo[6]};
  color: white;
  border: none;
  border-radius: 5px;
  outline: none;
  padding: 30px 0 20px;
  margin-top: -30px;
  box-shadow: 0 5px 55px rgba(255, 255, 255, 0.5);
  font-size: 1rem;
  cursor: pointer;
  z-index: 1;
  transition: 0.16s all;
  &:hover {
    border: 1px solid ${oc.indigo[6]};
    background: ${oc.indigo[4]};
  }
  &:active {
    transform: translateY(2px);
  }
`;
