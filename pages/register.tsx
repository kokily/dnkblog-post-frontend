import React from 'react';
import AuthTemplate from '../components/auth/AuthTemplate';
import RegisterContainer from '../containers/auth/RegisterContainer';
import useLoggedIn from '../libs/hooks/useLoggedIn';

function RegisterPage() {
  useLoggedIn();

  return (
    <AuthTemplate mode="register">
      <RegisterContainer />
    </AuthTemplate>
  );
}

export default RegisterPage;
