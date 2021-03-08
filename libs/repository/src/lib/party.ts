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
  getById: async (id: string): Promise<Party> => {
    const clientRef = Firebase.instance.db
      .collection(FIRESTORE_KEY.PARTIES)
      .withConverter(partyConverter)
      .doc(id);
    const snapshot = await clientRef.get();
    return snapshot.data();
  },
  create: async (party: Party): Promise<{ id: string }> => {
    const docRef = await Firebase.instance.db
      .collection(FIRESTORE_KEY.PARTIES)
      .withConverter(partyConverter)
      .add(party);

    return { id: docRef.id };
  },
  update: async (id: string, party: Party): Promise<void> => {
    const clientRef = Firebase.instance.db
      .collection(FIRESTORE_KEY.PARTIES)
      .doc(id);
    await clientRef.update(party);
  },
};
