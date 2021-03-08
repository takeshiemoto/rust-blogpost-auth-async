import React, { useEffect, useState } from 'react';
import { Party } from '@ienomi/entity';
import { AppRepository, PartyRepository } from '@ienomi/repository';
import { useRouter } from 'next/router';

const PartyDetail = () => {
  const router = useRouter();
  const [party, setParty] = useState<Party>(null);

  useEffect(() => {
    const id = router.query['id'] as string;
    PartyRepository.getById(id).then((party) => setParty(party));
  }, [router.query]);

  const endParty = async () => {
    // Controller??
    const now = await AppRepository.getServerTimestamp();
    await PartyRepository.update(party.id, {
      name: party.name,
      startTime: party.startTime,
      createdAt: party.createdAt,
      endTime: now,
      updateAt: now,
    });

    router.push('/party');
  };

  return (
    <div>
      <h2>{party && party.name}</h2>
      <button onClick={endParty}>終了</button>
    </div>
  );
};

export default PartyDetail;
