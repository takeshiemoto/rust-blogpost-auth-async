import React, { createContext, Dispatch, SetStateAction, useState } from 'react';
import { AppProps } from 'next/app';

import './styles.css';

export const AuthContext = createContext<{
  uid: string | null;
  setUid: Dispatch<SetStateAction<string>>;
}>(null);

function CustomApp({ Component, pageProps }: AppProps) {
  const [uid, setUid] = useState<string | null>(null);
  return (
    <AuthContext.Provider value={{ uid, setUid }}>
      <Component {...pageProps} />
    </AuthContext.Provider>
  );
}

export default CustomApp;
