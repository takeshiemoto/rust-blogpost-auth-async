import { Firebase } from '@ienomi/infra';

export const PartyRepository = {
  getAll: async () => {
    const clientRef = Firebase.instance.db.collection('parties');
    const snapshot = await clientRef.get();
    return snapshot.docs.map((d) => d.data());
  },
};
