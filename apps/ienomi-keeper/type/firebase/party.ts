import firebase from 'firebase/';

export type PartyFields = {
  name: string;
  startTime: firebase.firestore.Timestamp;
  endTime: firebase.firestore.Timestamp;
  createdAt: firebase.firestore.Timestamp;
  updateAt: firebase.firestore.Timestamp;
};
