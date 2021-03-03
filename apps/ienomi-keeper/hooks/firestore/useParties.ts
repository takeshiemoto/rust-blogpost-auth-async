import { Firebase } from '@ienomi/infra';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { PartyHooks } from '../../domain/party/PartyHooksContext';

export const useParties: PartyHooks['useParties'] = () => {
  const [parties, loading, error] = useCollectionData(
    Firebase.instance.db.collection('parties')
  );
  console.log(parties);
  return {
    parties: [],
    loading,
    error,
  };
};
