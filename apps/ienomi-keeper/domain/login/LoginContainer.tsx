import React, { FC } from 'react';
import Link from 'next/link';
import { LoginForm } from './LoginForm';

export const LoginContainer: FC = () => {
  return (
    <div>
      <h2>Login</h2>
      <LoginForm />
      <Link href={'/signup'}>新規会員登録</Link>
    </div>
  );
};
