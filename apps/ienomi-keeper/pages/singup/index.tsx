import React, { useContext } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { UserRepository } from '@ienomi/repository';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { object, string } from 'yup';
import { SignUpContext } from '../../context/SingUp';

type FormType = { email: string; password: string };

const Signup = () => {
  const router = useRouter();
  const { setUser, user } = useContext(SignUpContext);

  const schema = object().shape({
    email: string().required(),
    password: string().required(),
  });

  const {
    register,
    errors,
    trigger,
    setError,
    handleSubmit,
    formState,
  } = useForm<FormType>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: user?.email,
      password: user?.password,
    },
  });

  const onSubmit = async ({ email, password }: FormType) => {
    const isAlreadyRegistered = await UserRepository.checkAlreadyRegistered(
      email
    );

    if (isAlreadyRegistered) {
      setError('email', {
        type: 'auth',
        message: 'このメールアドレスは既に利用されています',
      });
      return;
    }

    setUser({ email, password });
    router.push('/singup/confirm');
  };

  return (
    <div>
      <h2>SingUp</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div>
            <input
              type={'text'}
              name={'email'}
              ref={register}
              onChange={() => trigger('email')}
            />
            <p>{errors?.email?.message}</p>
          </div>
          <div>
            <input
              type={'password'}
              name={'password'}
              ref={register}
              onChange={() => trigger('password')}
            />
            <p>{errors?.password?.message}</p>
          </div>
          <div>
            <button disabled={formState.isSubmitting}>確認画面へ</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Signup;
