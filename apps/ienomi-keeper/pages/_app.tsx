import React from 'react';
import { SSRProvider, Provider, defaultTheme } from '@adobe/react-spectrum';

import { AppProps } from 'next/app';
import './styles.css';
import { AuthProvider } from '../domain/app/AuthContext';
import { SingUpProvider } from '../domain/singup/SignupContext';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <SSRProvider>
      <Provider theme={defaultTheme} colorScheme={'dark'}>
        <AuthProvider>
          <SingUpProvider>
            <Component {...pageProps} />
          </SingUpProvider>
        </AuthProvider>
      </Provider>
    </SSRProvider>
  );
}

export default CustomApp;
