import React, { useReducer } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_EMAIL } from '../libs/graphql/auth';

interface AuthState {
  email: string;
  password: string;
}

interface AuthAction {
  name: string;
  value: string;
}

function reducer(state: AuthState, action: AuthAction) {
  return {
    ...state,
    [action.name]: action.value,
  };
}

function LoginPage() {
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

    try {
      const response = await LoginEmail({
        variables: { email, password },
      });

      if (response.data?.LoginEmail.error) {
        console.error(response.data.LoginEmail.error);
      } else {
        if (!response || !response.data) return;

        await client.clearStore();

        window.location.href = '/';
      }
    } catch (err) {
      console.table({ err });
    }
  };

  return (
    <>
      <div>
        <h2>Email Login</h2>
        <div>
          <input type="text" name="email" value={email} onChange={onChange} />
        </div>
        <div>
          <input type="password" name="password" value={password} onChange={onChange} />
        </div>

        <button onClick={onSubmit}>Login</button>
      </div>

      <div>
        <a
          href={`https://github.com/login/oauth/authorize?client_id=3260375f9e6dd0827621&scope=user`}
        >
          Github Login
        </a>
      </div>

      <div>
        <a href="http://localhost:4000/social/google/login">Google Login</a>
      </div>
    </>
  );
}

export default LoginPage;
