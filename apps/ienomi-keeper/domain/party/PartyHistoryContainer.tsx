import React, { FC } from 'react';
import { Party } from '@ienomi/entity';
import Link from 'next/link';
import styled from 'styled-components';
import { useRequireAuth } from '../../hooks/useRequreAuth';
import { useParty } from './useParty';

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
  const auth = useRequireAuth();
  const { parties } = useParty();

  if (!auth) {
    return <div>Loading</div>;
  }

  return <StyledComponent parties={parties} />;
};
