import React, { FC } from 'react';
import { SignupConfirm } from './SignupConfirm';
import { SignupLayout } from './SignupLayout';

export const SignupConfirmContainer: FC = () => {
  return (
    <SignupLayout>
      <SignupConfirm />
    </SignupLayout>
  );
};
