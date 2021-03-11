// Firebaseのテーブル定義
import firebase from 'firebase';

export type PartyFields = {
  name: string;
  startTime: firebase.firestore.Timestamp;
  endTime: firebase.firestore.Timestamp;
  createdAt: firebase.firestore.Timestamp;
  updateAt: firebase.firestore.Timestamp;
};

export type DocRef<T> = firebase.firestore.DocumentReference<T>;
export type Timestamp = firebase.firestore.Timestamp;
