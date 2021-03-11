import { Party, PartyResponse, User } from '@ienomi/entity';
import { DocRef, Firebase, FIRESTORE_KEY, Timestamp } from '@ienomi/infra';

export const PartyRepository = {
  getAll: async () => {
    const snapshot = await Firebase.instance.db
      .collection(FIRESTORE_KEY.PARTIES)
      .get();

    const parties: Array<
      Party & { id: string } & { userRef: DocRef<User> }
    > = [];
    snapshot.forEach((doc) => {
      const data = doc.data() as Party & { userRef: DocRef<User> };
      parties.push({ ...data, id: doc.id });
    });

    const response: Array<PartyResponse> = await Promise.all(
      parties.map(async (party) => {
        const userSnap = await party.userRef.get();
        const user = userSnap.data();

        const startTime = ((party.startTime as unknown) as Timestamp).toDate();
        const endTime = ((party.endTime as unknown) as Timestamp).toDate();

        return {
          user,
          party: {
            id: party.id,
            name: party.name,
            time: party.time,
            userId: userSnap.id,
            startTime,
            endTime,
          },
        };
      })
    );

    return response;
  },
  geyById: async (id: string): Promise<PartyResponse> => {
    const docRef = await Firebase.instance.db
      .collection(FIRESTORE_KEY.PARTIES)
      .doc(id);

    const snapshot = await docRef.get();
    const data = snapshot.data() as Party & { userRef: DocRef<User> };

    const startTime = ((data.startTime as unknown) as Timestamp).toDate();
    const endTime = ((data.endTime as unknown) as Timestamp).toDate();

    const userSnap = await data.userRef.get();
    const user = userSnap.data();

    return {
      user,
      party: {
        id: snapshot.id,
        userId: user.id,
        name: data.name,
        time: data.time,
        endTime,
        startTime,
      },
    };
  },
  create: async (party: Party): Promise<{ id: string }> => {
    const userRef = await Firebase.instance.db
      .collection(FIRESTORE_KEY.USERS)
      .doc(party.userId);
    const docRef = await Firebase.instance.db
      .collection(FIRESTORE_KEY.PARTIES)
      .add({
        ...party,
        userRef,
      });
    return { id: docRef.id };
  },
};
