import { Party } from '@ienomi/entity';
import { Firebase, FIRESTORE_KEY, partyConverter } from '@ienomi/infra';

export const PartyRepository = {
  getAll: async (): Promise<Party[]> => {
    const clientRef = Firebase.instance.db
      .collection(FIRESTORE_KEY.PARTIES)
      .withConverter(partyConverter);
    const snapshot = await clientRef.get();
    return snapshot.docs.map((d) => d.data());
  },
  create: async (party: Party): Promise<void> => {
    await Firebase.instance.db
      .collection(FIRESTORE_KEY.PARTIES)
      .withConverter(partyConverter)
      .add(party);
  },
};
