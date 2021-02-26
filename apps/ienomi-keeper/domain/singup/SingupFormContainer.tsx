import React, { FC } from 'react';
import Link from 'next/link';
import { SignupLayout } from './SignupLayout';
import { SignupForm } from './SingupForm';

export const SignupFormContainer: FC = () => {
  return (
    <SignupLayout>
      <SignupForm />
      <Link href={'/login'}>既に登録済みの方</Link>
    </SignupLayout>
  );
};
