import React, { FC, useEffect, useState } from 'react';
import { Party } from '@ienomi/entity';
import { PartyRepository } from '@ienomi/repository';
import Link from 'next/link';
import styled from 'styled-components';
import { useRequireAuth } from '../../hooks/useRequreAuth';

type Props = {
  parties: Party[];
};

const Component: FC<Props> = ({ parties }) => (
  <ul>
    {parties.map(({ id, name }) => (
      <li key={id}>
        <Link href={`/party/${id}`}>{name}</Link>
      </li>
    ))}
  </ul>
);

const StyledComponent = styled(Component)``;

export const PartyHistoryContainer: FC = () => {
  const [parties, setParties] = useState<Party[]>([]);
  const auth = useRequireAuth();

  useEffect(() => {
    PartyRepository.getAll().then((parties) => setParties(parties));
  }, []);

  if (!auth) {
    return <div>Loading</div>;
  }

  return <StyledComponent parties={parties} />;
};
