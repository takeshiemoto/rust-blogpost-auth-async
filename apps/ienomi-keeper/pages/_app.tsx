import React from 'react';
import { AppProps } from 'next/app';

import './styles.css';
import { AuthProvider } from '../context/Auth';
import { SingUpProvider } from '../context/SingUp';

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
