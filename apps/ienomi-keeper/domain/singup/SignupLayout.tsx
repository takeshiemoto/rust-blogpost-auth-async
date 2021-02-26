import React, { FC, memo } from 'react';

export const SignupLayout: FC = memo(({ children }) => {
  return (
    <>
      <h2>Signup</h2>
      {children}
    </>
  );
});
