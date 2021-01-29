import React, { useReducer } from 'react';
import { useRouter } from 'next/router';
import { useMutation } from '@apollo/react-hooks';
import { toast } from 'react-toastify';
import { REGISTER_EMAIL } from '../../libs/graphql/auth';
import { AuthProps, AuthAction } from '../../libs/types';
import AuthForm from '../../components/auth/AuthForm';

function reducer(state: AuthProps, action: AuthAction) {
  return {
    ...state,
    [action.name]: action.value,
  };
}

function RegisterContainer() {
  const router = useRouter();
  const [RegisterEmail, { client }] = useMutation(REGISTER_EMAIL);
  const [state, dispatch] = useReducer(reducer, {
    email: '',
    username: '',
    password: '',
    passwordConfirm: '',
  });
  const { email, username, password, passwordConfirm } = state;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(e.target);
  };

  const onSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();

    if ([email, username, password, passwordConfirm].includes('')) {
      toast.error('빈 칸 없이 입력해주세요');
      return;
    }

    try {
      const response = await RegisterEmail({
        variables: { email, username, password },
      });

      if (response.data.RegisterEmail.error) {
        toast.error(response.data.RegisterEmail.error);
        return;
      } else {
        if (!response || !response.data) return;

        toast.success('이메일을 확인해주세요~');
        await client.resetStore();
        router.push('/login');
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
      mode="register"
      email={email}
      username={username}
      password={password}
      onChange={onChange}
      onSubmit={onSubmit}
      onKeyPress={onKeyPress}
    />
  );
}

export default RegisterContainer;
