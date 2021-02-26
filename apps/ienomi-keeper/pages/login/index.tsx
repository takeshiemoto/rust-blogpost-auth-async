import React, { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { AuthContext } from '../../domain/app/AuthContext';
import { LoginContainer } from '../../domain/login/LoginContainer';

const Login = () => {
  const router = useRouter();
  const auth = useContext(AuthContext);

  useEffect(() => {
    auth?.uid && router.replace('/');
  }, [auth, router]);

  return <LoginContainer />;
};

export default Login;
