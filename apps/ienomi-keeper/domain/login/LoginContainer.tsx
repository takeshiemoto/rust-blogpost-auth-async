import React, { FC, useContext, useEffect, useState } from 'react';
import {
  AlertDialog,
  Button,
  DialogContainer,
  Flex,
  Form,
  Heading,
  TextField,
  View,
} from '@adobe/react-spectrum';
import { Link as RSPLink } from '@adobe/react-spectrum';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { AuthContext } from '../app/AuthContext';
import { LoginForm } from './LoginForm';

export const LoginContainer: FC = () => {
  const router = useRouter();
  const auth = useContext(AuthContext);

  useEffect(() => {
    auth?.uid && router.replace('/party');
  }, [auth, router]);

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
