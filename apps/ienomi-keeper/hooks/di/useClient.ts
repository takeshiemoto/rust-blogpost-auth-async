import { Context, useContext } from 'react';

export const useClient = <T>(context: Context<T | null>): T => {
  const client = useContext(context);
  if (!client) {
    throw new Error('DI failed');
  }
  return client;
};
