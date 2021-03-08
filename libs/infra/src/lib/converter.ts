import { Party } from '@ienomi/entity';
import firebase from 'firebase';
import { Firebase } from './Firebase';
import { PartyFields } from './type';

export const partyConverter = {
  toFirestore: (party: { name: string }): firebase.firestore.DocumentData => {
    return {
      name: party.name,
      startTime: Firebase.instance.serverTimeStamp(),
      createdAt: Firebase.instance.serverTimeStamp(),
      endTime: null,
      updateAt: null,
    };
  },
  fromFirestore: (
    snapshot: firebase.firestore.QueryDocumentSnapshot,
    options: firebase.firestore.SnapshotOptions
  ): Party => {
    const data: PartyFields = snapshot.data(options) as never;
    return {
      id: snapshot.id,
      name: data.name,
      startTime: data.startTime.toDate(),
      endTime: data.endTime && data.endTime.toDate(),
      createdAt: data.createdAt.toDate(),
      updateAt: data.createdAt.toDate(),
    };
  },
};
