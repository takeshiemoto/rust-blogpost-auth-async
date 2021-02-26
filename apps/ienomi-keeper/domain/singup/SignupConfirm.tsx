import React, { useCallback, useContext, useEffect } from 'react';
import { UserRepository } from '@ienomi/repository';
import { useRouter } from 'next/router';
import { SignUpContext } from './SignupContext';

export const SignupConfirm = () => {
  const router = useRouter();
  const { user } = useContext(SignUpContext);

  const submit = useCallback(async () => {
    await UserRepository.createUserWithEmailAndPassword({
      email: user?.email,
      password: user?.password,
    });

    router.push('/signup/complete');
  }, [router, user]);

  const back = useCallback(() => {
    router.push('/signup');
  }, [router]);

  useEffect(() => {
    !user && back();
  }, [back, user]);

  return (
    <div>
      {user && (
        <>
          <p>以下のメールアドレスで登録します</p>
          <p>{user?.email}</p>
          <button onClick={submit}>登録</button>
          <button onClick={back}>再入力</button>
        </>
      )}
    </div>
  );
};
