import React, { useContext } from 'react';
import { UserRepository } from '@ienomi/repository';
import { useRouter } from 'next/router';
import { SignUpContext, USER_INITIAL_VALUES } from '../../context/SingUp';

export const Confirm = () => {
  const router = useRouter();
  const {
    user: { email, password },
    setUser,
  } = useContext(SignUpContext);
  const submit = async () => {
    await UserRepository.createUserWithEmailAndPassword({
      email: email,
      password: password,
    });

    setUser(USER_INITIAL_VALUES);
    router.push('/singup/complete');
  };

  const back = () => {
    router.push('/singup');
  };
  return (
    <div>
      <h2>確認画面</h2>
      <p>このメールアドレスで登録します</p>
      <p>{email}</p>
      <button onClick={() => submit()}>登録</button>
      <button onClick={() => back()}>再入力</button>
    </div>
  );
};

export default Confirm;
