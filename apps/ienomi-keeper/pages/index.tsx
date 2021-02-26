import React, { useCallback } from 'react';
import { SessionRepository } from '@ienomi/repository';
import styled from 'styled-components';
import { useRequireAuth } from '../hooks/useRequreAuth';

const StyledPage = styled.div`
  .page {
  }
`;

export function Index() {
  const auth = useRequireAuth();

  const logout = useCallback(() => {
    SessionRepository.logout();
  }, []);

  if (!auth) {
    return <div>Loading</div>;
  }

  return (
    <StyledPage>
      <h1>Ienomi Keeper</h1>
      <button onClick={logout}>ログアウト</button>
    </StyledPage>
  );
}

export default Index;
