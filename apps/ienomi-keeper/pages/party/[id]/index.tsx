import React, { useEffect, useState } from 'react';
import { Flex, Heading, View, Text, Button } from '@adobe/react-spectrum';
import { Party, User } from '@ienomi/entity';
import { PartyRepository } from '@ienomi/repository';
import { useRouter } from 'next/router';

const PartyDetail = () => {
  const router = useRouter();
  const [user, setUser] = useState<User | undefined>(undefined);
  const [party, setParty] = useState<Party | undefined>(undefined);

  useEffect(() => {
    const id = router.query['id'] as string;
    if (!id) {
      return;
    }
    PartyRepository.geyById(id).then(({ user, party }) => {
      setUser(user);
      setParty(party);
    });
  }, [router.query]);

  return (
    <Flex
      minHeight={'100vh'}
      justifyContent={'center'}
      alignItems={'center'}
      direction={'column'}
    >
      <View>
        <Heading level={2}>{party?.name}</Heading>
      </View>
      <View marginTop={'size-200'}>
        <Button variant={'secondary'} onPress={() => router.push('/')}>
          Home
        </Button>
      </View>
    </Flex>
  );
};

export default PartyDetail;
