import React, { useContext } from 'react';
import { SessionRepository } from '@ienomi/repository';
import { router } from 'next/client';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../context/Auth';

type FormType = { email: string; password: string };

const Login = () => {
  const auth = useContext(AuthContext);

  const { register, handleSubmit } = useForm<FormType>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = ({ email, password }: FormType) => {
    SessionRepository.login({ email, password });
  };

  if (auth?.uid) {
    router.replace('/');
  }

  return (
    <div>
      <h2>Login</h2>
      <form>
        <div>
          <input type={'text'} name={'email'} ref={register} />
        </div>
        <div>
          <input type={'password'} name={'password'} ref={register} />
        </div>
        <div>
          <button onClick={handleSubmit(onSubmit)}>ログイン</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
