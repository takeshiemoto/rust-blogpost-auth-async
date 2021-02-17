import React, { useContext, useEffect } from 'react';
import { SessionRepository } from '@ienomi/repository';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../context/Auth';

type FormType = { email: string; password: string };

const Login = () => {
  const router = useRouter();
  const auth = useContext(AuthContext);

  const { register, handleSubmit } = useForm<FormType>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  useEffect(() => {
    auth?.uid && router.replace('/');
  }, [auth, router]);

  const onSubmit = ({ email, password }: FormType) => {
    SessionRepository.login({ email, password });
  };

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
