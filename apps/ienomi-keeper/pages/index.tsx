import React, { useCallback, useContext, useEffect } from 'react';
import { SessionRepository } from '@ienomi/repository';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { AuthContext } from '../context/Auth';

const StyledPage = styled.div`
  .page {
  }
`;

export function Index() {
  const router = useRouter();
  const auth = useContext(AuthContext);

  useEffect(() => {
    auth?.uid === null && router.replace('/login');
  }, [auth, router]);

  const logout = useCallback(() => {
    SessionRepository.logout();
  }, []);

  return (
    <StyledPage>
      <h1>Ienomi Keeper</h1>
      <button onClick={logout}>ログアウト</button>
    </StyledPage>
  );
}

export default Index;
