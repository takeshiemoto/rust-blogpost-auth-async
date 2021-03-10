import React, { FC, useContext, useEffect } from 'react';
import { Flex, Heading, View } from '@adobe/react-spectrum';
import { useRouter } from 'next/router';
import { AuthContext } from '../app/AuthContext';
import { LoginForm } from './LoginForm';

export const LoginContainer: FC = () => {
  const router = useRouter();
  const user = useContext(AuthContext);

  useEffect(() => {
    user && router.replace('/party');
  }, [user, router]);

  return (
    <Flex
      direction={'column'}
      justifyContent={'center'}
      alignItems={'center'}
      minHeight={'100vh'}
    >
      <View>
        <Heading level={2}>Login</Heading>
      </View>
      <View>
        <LoginForm />
      </View>
    </Flex>
  );
};
