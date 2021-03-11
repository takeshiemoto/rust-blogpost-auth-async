import React, { useCallback } from 'react';
import {
  Button,
  ButtonGroup,
  Flex,
  Heading,
  View,
} from '@adobe/react-spectrum';
import { SessionRepository } from '@ienomi/repository';
import { useRouter } from 'next/router';
import { Loading } from '../components/Loading';
import { useRequireAuth } from '../hooks/useRequreAuth';

export function Index() {
  const router = useRouter();
  const auth = useRequireAuth();

  const signOut = useCallback(() => {
    SessionRepository.signOut();
  }, []);

  if (!auth.user) {
    return <Loading />;
  }

  return (
    <Flex
      minHeight={'100vh'}
      justifyContent={'center'}
      alignItems={'center'}
      direction={'column'}
    >
      <View>
        <Heading level={3}>ようこそ {auth.user.name} さん</Heading>
      </View>
      <View marginTop={'size-200'}>
        <ButtonGroup>
          <Button variant={'primary'} onPress={() => router.push('/party')}>
            Party
          </Button>
          <Button variant={'secondary'}>User</Button>
          <Button variant={'secondary'} onPress={signOut}>
            SignOut
          </Button>
        </ButtonGroup>
      </View>
    </Flex>
  );
}

export default Index;
