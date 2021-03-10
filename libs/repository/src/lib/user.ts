import { User } from '@ienomi/entity';
import { Firebase, FIRESTORE_KEY } from '@ienomi/infra';

export const UserRepository = {
  checkAlreadyRegistered: async (email: string): Promise<boolean> => {
    const response = await Firebase.instance.auth.fetchSignInMethodsForEmail(
      email
    );
    return response.includes('password');
  },
  createUserWithEmailAndPassword: async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<string> => {
    try {
      const userCredential = await Firebase.instance.auth.createUserWithEmailAndPassword(
        email,
        password
      );
      await Firebase.instance.db
        .collection(FIRESTORE_KEY.USERS)
        .doc(userCredential.user.uid)
        .set({
          email,
          name: 'ななし',
        });
      return userCredential.user.uid;
    } catch (e) {
      console.error(e);
      throw new Error(e);
    }
  },
};
