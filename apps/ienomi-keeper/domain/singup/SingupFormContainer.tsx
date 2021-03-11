import React, { FC } from 'react';
import { Flex, View } from '@adobe/react-spectrum';
import Link from 'next/link';
import { SignupForm } from './SingupForm';

export const SignupFormContainer: FC = () => {
  return (
    <Flex
      direction={'column'}
      justifyContent={'center'}
      alignItems={'center'}
      minHeight={'100vh'}
    >
      <View>
        <SignupForm />
      </View>
      <View marginTop={'size-300'}>
        <Link href={'/signin'}>既に登録済みの方</Link>
      </View>
    </Flex>
  );
};
