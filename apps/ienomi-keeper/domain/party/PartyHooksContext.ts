import { createContext } from 'react';
import { useClient } from '../../hooks/di/useClient';

export type Party = {
  id: string;
  name: string;
};

export type PartyHooks = {
  useParties(): {
    parties: Party[];
    loading: boolean;
    error: Error;
  };
};

export const PartyHooksContext = createContext<PartyHooks | null>(null);

export const useParties: PartyHooks['useParties'] = () => {
  const client = useClient(PartyHooksContext);
  return client.useParties();
};
