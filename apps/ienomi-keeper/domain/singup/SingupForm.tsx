import React, { useCallback } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { UserRepository } from '@ienomi/repository';
import { useRouter } from 'next/router';
import { SubmitHandler, useForm } from 'react-hook-form';
import { object, string } from 'yup';
import { FormType } from './type';

export const SignupForm = () => {
  const router = useRouter();

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
      email: '',
      password: '',
    },
  });

  const onValid: SubmitHandler<FormType> = useCallback(
    async ({ email, password }) => {
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

      await UserRepository.createUserWithEmailAndPassword({
        email,
        password,
      });

      router.push('/');
    },
    [router, setError]
  );

  return (
    <form onSubmit={handleSubmit(onValid)}>
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
          <button disabled={formState.isSubmitting}>登録</button>
        </div>
      </div>
    </form>
  );
};
