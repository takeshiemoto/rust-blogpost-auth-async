import { User } from '@ienomi/entity';
import { Firebase, FIRESTORE_KEY } from '@ienomi/infra';

export const SessionRepository = {
  signIn: async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<string> => {
    const userCredential = await Firebase.instance.auth.signInWithEmailAndPassword(
      email,
      password
    );
    return userCredential.user.uid;
  },
  checkAlreadyLogin: ({
    successHandle,
    errorHandle,
  }: {
    successHandle: (user: User) => void;
    errorHandle: () => void;
  }): void => {
    Firebase.instance.auth.onAuthStateChanged(async (auth) => {
      if (!auth) {
        errorHandle();
        return;
      }

      const clientRef = Firebase.instance.db
        .collection(FIRESTORE_KEY.USERS)
        .doc(auth.uid);

      const snapshot = await clientRef.get();
      const user = snapshot.data() as User;

      successHandle(user);
      return;
    });
  },
  signOut: (): void => {
    Firebase.instance.auth.signOut();
  },
};
