import { Firebase } from '@ienomi/infra';

export const SessionRepository = {
  login: async ({ email, password }: { email: string; password: string }): Promise<string> => {
    const userCredential = await Firebase.instance.auth.signInWithEmailAndPassword(email, password);
    return userCredential.user.uid;
  },
  checkAlreadyLogin: ({
    successHandle,
    errorHandle,
  }: {
    successHandle: (userId: string) => void;
    errorHandle: () => void;
  }): void => {
    Firebase.instance.auth.onAuthStateChanged((user) => {
      if (user) {
        successHandle(user.uid);
        return;
      }
      errorHandle();
    });
  },
  logout: (): void => {
    Firebase.instance.auth.signOut();
  },
};
