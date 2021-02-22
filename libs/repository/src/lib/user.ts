import { Firebase } from '@ienomi/infra';

export const UserRepository = {
  checkAlreadyRegistered: async (email: string): Promise<boolean> => {
    const response = await Firebase.instance.auth.fetchSignInMethodsForEmail(
      email
    );
    return response.includes('password');
  },
  createUser: async (email: string, password: string): Promise<string> => {
    try {
      const userCredential = await Firebase.instance.auth.createUserWithEmailAndPassword(
        email,
        password
      );
      return userCredential.user.uid;
    } catch (e) {
      console.error(e);
      throw new Error(e);
    }
  },
};
