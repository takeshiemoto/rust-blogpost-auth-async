import React from 'react';
import { AppProps } from 'next/app';

import './styles.css';
import { AuthProvider } from '../domain/app/AuthContext';
import { PartyHooksContext } from '../domain/party/PartyHooksContext';
import { SingUpProvider } from '../domain/singup/SignupContext';

import * as firestorePartyHooks from '../hooks/firestore/useParties';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <SingUpProvider>
        {/* ここでFirestoreをDIする */}
        <PartyHooksContext.Provider value={firestorePartyHooks}>
          <Component {...pageProps} />
        </PartyHooksContext.Provider>
      </SingUpProvider>
    </AuthProvider>
  );
}

export default CustomApp;
