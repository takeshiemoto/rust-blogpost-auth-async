import React, { useCallback } from 'react';
import { Button, Flex, Heading, View } from '@adobe/react-spectrum';
import { SessionRepository } from '@ienomi/repository';
import { useRequireAuth } from '../hooks/useRequreAuth';

export function Index() {
  const auth = useRequireAuth();

  const logout = useCallback(() => {
    SessionRepository.signOut();
  }, []);

  if (!auth.user) {
    return <div>Loading...</div>;
  }

  return (
    <Flex minHeight={'100vh'}>
      <View>
        <Heading level={3}>ようこそ {auth.user.name} さん</Heading>
        <Button onPress={logout} variant={'primary'}>
          ログアウト
        </Button>
      </View>
    </Flex>
  );
}

export default Index;
