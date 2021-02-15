import { Firebase } from '@ienomi/infra';

export const SessionRepository = {
  login: async (email: string, password: string): Promise<string> => {
    const userCredential = await Firebase.instance.auth.signInWithEmailAndPassword(email, password);
    return userCredential.user.uid;
  },
  checkAlreadyLogin: (successHandler: (userId: string) => void, errorHandler: () => void): void => {
    Firebase.instance.auth.onAuthStateChanged((user) => {
      if (user) {
        successHandler(user.uid);
        return;
      }
      errorHandler();
    });
  },
  logout: (): void => {
    Firebase.instance.auth.signOut();
  },
};
