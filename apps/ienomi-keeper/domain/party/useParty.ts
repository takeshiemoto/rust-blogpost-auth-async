import { useCallback, useEffect, useState } from 'react';
import { Party } from '@ienomi/entity';
import { PartyRepository } from '@ienomi/repository';
import { useRouter } from 'next/router';

export const useParty = () => {
  const router = useRouter();
  const [parties, setParties] = useState<Party[]>([]);

  useEffect(() => {
    PartyRepository.getAll().then((parties) => setParties(parties));
  }, []);

  const createParty = useCallback(
    async (name: string) => {
      // UIからRepositoryのIFに変換するコードを書いて良い
      const party: Party = {
        name,
      };
      const response = await PartyRepository.create(party);

      router.push(`/party/${response.id}`);
    },
    [router]
  );

  return {
    parties,
    createParty,
  };
};
