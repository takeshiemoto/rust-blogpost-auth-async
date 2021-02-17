import React, { useEffect, useState } from 'react';
import { createContext, FC } from 'react';
import { SessionRepository } from '@ienomi/repository';

const AuthContext = createContext<{
  uid: string | null;
}>(null);

const AuthProvider: FC = ({ children }) => {
  const [uid, setUid] = useState<string | null>(null);
  useEffect(() => {
    SessionRepository.checkAlreadyLogin({
      successHandle: (userId: string) => {
        setUid(userId);
      },
      errorHandle: () => {
        setUid(null);
      },
    });
  }, []);
  return <AuthContext.Provider value={{ uid }}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
