import { useCallback, useState } from 'react';
import { AppRepository } from '@ienomi/repository';

export const useTimer = () => {
  const [data, setData] = useState<string | undefined>(undefined);

  const timerInit = useCallback((date: Date) => {
    const now = AppRepository.getServerTimestamp().getTime();
    const endTime = date.getTime();
    const diff = endTime - now;
    const diffSecond = Math.floor(diff / 1000);

    const MINUTE_SEC = 60;
    const HOUR_SEC = 60 * 60;

    // あと何時間
    const hour = Math.floor((diffSecond / HOUR_SEC) % 24);
    const min = Math.floor((diffSecond / MINUTE_SEC) % 60);
    const sec = Math.floor(diffSecond % MINUTE_SEC);

    setData(`残り: ${hour}時間${min}分${sec}秒`);
  }, []);

  return {
    data,
    timerInit,
  };
};
