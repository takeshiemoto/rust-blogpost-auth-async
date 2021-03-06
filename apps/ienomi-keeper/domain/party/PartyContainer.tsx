import React, { useEffect, useState, VFC } from 'react';
import { Party } from '@ienomi/entity';
import { PartyRepository } from '@ienomi/repository';
import Link from 'next/link';
import { useRequireAuth } from '../../hooks/useRequreAuth';

export const PartyContainer: VFC = () => {
  const [parties, setParties] = useState<Party[]>([]);
  const auth = useRequireAuth();

  useEffect(() => {
    PartyRepository.getAll().then((parties) => setParties(parties));
  }, []);

  if (!auth) {
    return <div>Loading</div>;
  }

  return (
    <div>
      <h2>Party</h2>
      <Link href={'/party/new'}>New Party</Link>
      {parties.map((party) => (
        <div key={party.id}>{party.name}</div>
      ))}
    </div>
  );
};
