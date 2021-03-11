import React, { useEffect, useState, VFC } from 'react';
import {
  Flex,
  Item,
  Link,
  ListBox,
  Section,
  View,
} from '@adobe/react-spectrum';
import { PartyResponse } from '@ienomi/entity';
import { PartyRepository } from '@ienomi/repository';

const PartyHistory: VFC = () => {
  const [parties, setParties] = useState<PartyResponse[]>([]);
  useEffect(() => {
    PartyRepository.getAll().then((res) => {
      setParties(res);
    });
  }, []);

  return (
    <Flex
      minHeight={'100vh'}
      justifyContent={'center'}
      alignItems={'center'}
      direction={'column'}
    >
      <View>
        <ListBox width={'size-2400'} aria-label={'Alignment'}>
          <Section title={'Parties'}>
            {parties.map((party) => (
              <Item key={party.party.id}>{party.party.name}</Item>
            ))}
          </Section>
        </ListBox>
      </View>
    </Flex>
  );
};

export default PartyHistory;
