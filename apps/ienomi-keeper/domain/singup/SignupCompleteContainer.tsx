import React, { FC } from 'react';
import { SignupComplete } from './SignupComplete';
import { SignupLayout } from './SignupLayout';

export const SignupCompleteContainer: FC = () => {
  return (
    <SignupLayout>
      <SignupComplete />
    </SignupLayout>
  );
};
