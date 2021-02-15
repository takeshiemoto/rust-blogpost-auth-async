import { Firebase } from '@ienomi/infra';

export const UserRepository = {
  createUser: async (email: string, password: string) => {
    try {
      Firebase.instance.auth.createUserWithEmailAndPassword(email, password);
    } catch (e) {
      console.error(e);
      throw new Error(e);
    }
  },
};
