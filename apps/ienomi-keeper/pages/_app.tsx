import React from 'react';
import { AppProps } from 'next/app';

import './styles.css';
import { AuthProvider } from '../domain/app/AuthContext';
import { SingUpProvider } from '../domain/singup/SignupContext';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <SingUpProvider>
        <Component {...pageProps} />
      </SingUpProvider>
    </AuthProvider>
  );
}

export default CustomApp;
