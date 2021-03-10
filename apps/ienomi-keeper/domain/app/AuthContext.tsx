import React, { useEffect, useState } from 'react';
import { createContext, FC } from 'react';
import { User } from '@ienomi/entity';
import { SessionRepository } from '@ienomi/repository';

const AuthContext = createContext<{
  user: User | null;
}>(null);

const AuthProvider: FC = ({ children }) => {
  const [user, setUser] = useState<User | null | undefined>(undefined);
  useEffect(() => {
    SessionRepository.checkAlreadyLogin({
      successHandle: (user: User) => {
        setUser(user);
      },
      errorHandle: () => {
        setUser(null);
      },
    });
  }, []);
  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
