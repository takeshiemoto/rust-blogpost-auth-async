import React, {
  createContext,
  Dispatch,
  FC,
  SetStateAction,
  useState,
} from 'react';

export type User = { email: string; password: string };

export const USER_INITIAL_VALUES = {
  email: '',
  password: '',
};

export const SignUpContext = createContext<{
  user: User;
  setUser: Dispatch<SetStateAction<User>>;
}>(null);

export const SingUpProvider: FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  return (
    <SignUpContext.Provider value={{ user, setUser }}>
      {children}
    </SignUpContext.Provider>
  );
};