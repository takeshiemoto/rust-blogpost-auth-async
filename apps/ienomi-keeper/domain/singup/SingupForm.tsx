import React, { useCallback, useContext } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { UserRepository } from '@ienomi/repository';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { object, string } from 'yup';
import { SignUpContext } from './SignupContext';
import { FormType } from './type';

export const SignupForm = () => {
  const router = useRouter();
  const { setUser, user } = useContext(SignUpContext);

  const schema = object().shape({
    email: string().required(),
    password: string().required(),
  });

  const {
    setError,
    handleSubmit,
    errors,
    register,
    trigger,
    formState,
  } = useForm<FormType>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: user?.email,
      password: user?.password,
    },
  });

  const confirmation = useCallback(
    async ({ email, password }: FormType) => {
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

      router.push('/signup/confirm');
    },
    [router, setError, setUser]
  );

  return (
    <form onSubmit={handleSubmit(confirmation)}>
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
  );
};
