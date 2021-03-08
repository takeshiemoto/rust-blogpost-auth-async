import { Firebase } from '@ienomi/infra';

export const AppRepository = {
  getServerTimestamp: () => {
    return Firebase.instance.serverTimeStamp();
  },
};
