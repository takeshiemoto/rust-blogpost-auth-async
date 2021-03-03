import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

export class Firebase {
  private static _instance: Firebase;
  private _auth: firebase.auth.Auth;
  private _db: firebase.firestore.Firestore;

  private constructor() {
    firebase.initializeApp({
      apiKey: process.env.FIREBASE_API_KEY,
      authDomain: process.env.FIREBASE_AUTH_DOMAIN,
      projectId: process.env.FIREBASE_PROJECT_ID,
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.FIREBASE_APP_ID,
    });

    this._auth = firebase.auth();
    this._db = firebase.firestore();
  }

  static get instance(): Firebase {
    if (!this._instance) {
      this._instance = new Firebase();
    }
    return this._instance;
  }

  public get auth() {
    if (this._auth) {
      return this._auth;
    }
    this._auth = firebase.auth();
    return this._auth;
  }

  public get db() {
    if (this._db) {
      return this._db;
    }
    this._db = firebase.firestore();
    return this._db;
  }

  public serverTimeStamp() {
    return firebase.firestore.FieldValue.serverTimestamp();
  }

  public get firestore() {
    return firebase.firestore;
  }
}
