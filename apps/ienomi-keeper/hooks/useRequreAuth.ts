import { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { AuthContext } from '../domain/app/AuthContext';

export const useRequireAuth = () => {
  const router = useRouter();
  const auth = useContext(AuthContext);

  useEffect(() => {
    auth?.user === null && router.replace('/login');
  }, [auth, router]);

  return auth;
};
