import React, { FC, useContext, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { AuthContext } from '../app/AuthContext';
import { LoginForm } from './LoginForm';

export const LoginContainer: FC = () => {
  const router = useRouter();
  const auth = useContext(AuthContext);

  useEffect(() => {
    auth?.uid && router.replace('/party');
  }, [auth, router]);

  return (
    <div>
      <h2>Login</h2>
      <LoginForm />
      <Link href={'/signup'}>新規会員登録</Link>
    </div>
  );
};
