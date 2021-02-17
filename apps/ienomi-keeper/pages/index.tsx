import React, { useContext } from 'react';
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

  if (!auth.uid) {
    router.replace('/login');
  }

  return (
    <StyledPage>
      <h1>Ienomi Keeper</h1>
    </StyledPage>
  );
}

export default Index;
