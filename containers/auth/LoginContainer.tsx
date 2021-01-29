import React, { useReducer } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { toast } from 'react-toastify';
import { LOGIN_EMAIL } from '../../libs/graphql/auth';
import { AuthProps, AuthAction } from '../../libs/types';
import AuthForm from '../../components/auth/AuthForm';

function reducer(state: AuthProps, action: AuthAction) {
  return {
    ...state,
    [action.name]: action.value,
  };
}

function LoginContainer() {
  const [LoginEmail, { client }] = useMutation(LOGIN_EMAIL);
  const [state, dispatch] = useReducer(reducer, {
    email: '',
    password: '',
  });
  const { email, password } = state;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(e.target);
  };

  const onSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();

    if ([email, password].includes('')) {
      toast.error('빈 칸 없이 입력해주세요');
      return;
    }

    try {
      const response = await LoginEmail({
        variables: { email, password },
      });

      if (response.data.LoginEmail.error) {
        toast.error(response.data.LoginEmail.error);
        return;
      } else {
        if (!response || !response.data) return;

        toast.info('로그인');
        await client.clearStore();
        window.location.href = '/';
      }
    } catch (err) {
      toast.error(err);
    }
  };

  const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      // @ts-ignore
      onSubmit(e);
    }
  };

  return (
    <AuthForm
      mode="login"
      email={email}
      password={password}
      onChange={onChange}
      onSubmit={onSubmit}
      onKeyPress={onKeyPress}
    />
  );
}

export default LoginContainer;
