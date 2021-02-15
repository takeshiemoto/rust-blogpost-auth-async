import React, { useContext, useEffect } from 'react';
import { SessionRepository } from '@ienomi/repository';
import styled from 'styled-components';
import { AuthContext } from './_app';

const StyledPage = styled.div`
  .page {
  }
`;

export function Index() {
  const auth = useContext(AuthContext);
  useEffect(() => {
    SessionRepository.checkAlreadyLogin({
      successHandle: (userId: string) => {
        auth.setUid(userId);
      },
      errorHandle: () => {
        auth.setUid(null);
      },
    });
  }, []);
  return (
    <StyledPage>
      <h1>Ienomi Keeper</h1>
      {auth.uid ? (
        <div>
          <p>{auth.uid}</p>
          <button
            onClick={async () => {
              await SessionRepository.logout();
            }}
          >
            ログアウト
          </button>
        </div>
      ) : (
        <button
          onClick={async () => {
            const uid = await SessionRepository.login({
              email: '',
              password: '',
            });
            console.log(uid);
          }}
        >
          ログイン
        </button>
      )}
    </StyledPage>
  );
}

export default Index;
