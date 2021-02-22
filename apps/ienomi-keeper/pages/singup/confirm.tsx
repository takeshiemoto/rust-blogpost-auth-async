import React, { useContext, useEffect } from 'react';
import { UserRepository } from '@ienomi/repository';
import { useRouter } from 'next/router';
import { SignUpContext, USER_INITIAL_VALUES } from '../../context/SingUp';

export const Confirm = () => {
  const router = useRouter();
  const { user, setUser } = useContext(SignUpContext);

  useEffect(() => {
    !user && router.push('/singup');
  }, [router, user]);

  const submit = async () => {
    await UserRepository.createUserWithEmailAndPassword({
      email: user?.email,
      password: user?.password,
    });

    setUser(USER_INITIAL_VALUES);
    router.push('/singup/complete');
  };

  const back = () => {
    router.push('/singup');
  };
  return (
    <div>
      {user && (
        <>
          <h2>確認画面</h2>
          <p>以下のメールアドレスで登録します</p>
          <p>{user?.email}</p>
          <button onClick={() => submit()}>登録</button>
          <button onClick={() => back()}>再入力</button>
        </>
      )}
    </div>
  );
};

export default Confirm;
