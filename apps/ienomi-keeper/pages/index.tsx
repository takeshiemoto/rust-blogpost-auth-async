import React, { useContext } from 'react';
import styled from 'styled-components';
import { AuthContext } from './_app';

const StyledPage = styled.div`
  .page {
  }
`;

export function Index() {
  const auth = useContext(AuthContext);
  return (
    <StyledPage>
      <h1>Ienomi Keeper</h1>
    </StyledPage>
  );
}

export default Index;
