import React, { useCallback } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { SessionRepository } from '@ienomi/repository';
import { useForm } from 'react-hook-form';
import { object, string } from 'yup';
import { FormType } from './type';

export const LoginForm = () => {
  const schema = object().shape({
    email: string().required('メールアドレスを入力してください'),
    password: string().required('パスワードを入力してください'),
  });

  const {
    setError,
    register,
    errors,
    handleSubmit,
    formState,
  } = useForm<FormType>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const submit = useCallback(
    async ({ email, password }: FormType) => {
      try {
        await SessionRepository.login({ email, password });
      } catch (error) {
        setError('email', {
          type: 'auth',
          message: 'メールアドレスまたはパスワードが正しくありません',
        });
        setError('password', {
          type: 'auth',
          message: 'メールアドレスまたはパスワードが正しくありません',
        });
      }
    },
    [setError]
  );

  return (
    <form>
      <div>
        <input type={'text'} name={'email'} ref={register} />
        <p>{errors?.email?.message}</p>
      </div>
      <div>
        <input type={'password'} name={'password'} ref={register} />
        <p>{errors?.password?.message}</p>
      </div>
      <div>
        <button
          onClick={handleSubmit(submit)}
          disabled={formState.isSubmitting}
        >
          ログイン
        </button>
      </div>
    </form>
  );
};
