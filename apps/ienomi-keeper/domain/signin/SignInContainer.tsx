import React, { FC, useContext, useEffect } from 'react';
import { Flex, Heading, View } from '@adobe/react-spectrum';
import { useRouter } from 'next/router';
import { AuthContext } from '../app/AuthContext';
import { SignInForm } from './SignInForm';

export const SignInContainer: FC = () => {
  const router = useRouter();
  const auth = useContext(AuthContext);

  useEffect(() => {
    auth.user && router.push('/');
  }, [auth, router]);

  return (
    <Flex
      direction={'column'}
      justifyContent={'center'}
      alignItems={'center'}
      minHeight={'100vh'}
    >
      <View>
        <Heading level={2}>IENOMI</Heading>
      </View>
      <View>
        <SignInForm />
      </View>
    </Flex>
  );
};
