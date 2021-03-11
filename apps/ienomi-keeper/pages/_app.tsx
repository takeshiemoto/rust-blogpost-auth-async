import React from 'react';
import { SSRProvider, Provider, defaultTheme } from '@adobe/react-spectrum';

import { AppProps } from 'next/app';
import './styles.css';
import { AuthProvider } from '../domain/app/AuthContext';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <SSRProvider>
      <Provider theme={defaultTheme} colorScheme={'dark'}>
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </Provider>
    </SSRProvider>
  );
}

export default CustomApp;
