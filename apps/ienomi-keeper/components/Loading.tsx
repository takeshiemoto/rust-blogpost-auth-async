import React, { VFC } from 'react';
import { Flex, ProgressBar, View } from '@adobe/react-spectrum';

export const Loading: VFC = () => (
  <Flex minHeight={'100vh'} justifyContent={'center'} alignItems={'center'}>
    <View>
      <ProgressBar label={'Loading...'} isIndeterminate />
    </View>
  </Flex>
);
