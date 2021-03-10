import { User } from '@ienomi/entity';
import { Firebase, FIRESTORE_KEY } from '@ienomi/infra';

export const SessionRepository = {
  login: async ({
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
      if (auth) {
        const clientRef = Firebase.instance.db
          .collection(FIRESTORE_KEY.USERS)
          .doc(auth.uid);

        const snapshot = await clientRef.get();
        const user = snapshot.data() as User;

        successHandle(user);
        return;
      }
      errorHandle();
    });
  },
  logout: (): void => {
    Firebase.instance.auth.signOut();
  },
};
