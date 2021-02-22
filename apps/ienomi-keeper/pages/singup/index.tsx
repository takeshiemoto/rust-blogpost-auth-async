import React, { useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { UserRepository } from '@ienomi/repository';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { object, string } from 'yup';

const STEP = {
  INPUT: 1,
  CONFIRM: 2,
  COMPLETE: 3,
} as const;

type FormType = { email: string; password: string };

const Signup = () => {
  const [currentStep, setStep] = useState<typeof STEP[keyof typeof STEP]>(
    STEP.INPUT
  );
  const schema = object().shape({
    email: string().required(),
    password: string().required(),
  });

  const { register, errors, trigger, getValues, setError } = useForm<FormType>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onConfirm = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    await trigger();

    const email = getValues('email');
    const isAlreadyRegistered =
      email.length && (await UserRepository.checkAlreadyRegistered(email));
    if (isAlreadyRegistered) {
      setError('email', {
        type: 'auth',
        message: 'このメールアドレスは既に利用されています',
      });
    }

    const isValid = !Object.keys(errors).length;
    if (isValid) {
      setStep(STEP.CONFIRM);
    }
  };

  return (
    <div>
      <h2>Signin</h2>
      {currentStep === STEP.INPUT && (
        <form>
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
            <button onClick={onConfirm}>確認</button>
          </div>
        </form>
      )}
      {currentStep === STEP.CONFIRM && (
        <div>
          <p>このメールアドレスで登録します</p>
          <p>{getValues('email')}</p>
          <button onClick={() => setStep(STEP.COMPLETE)}>確認</button>
          <button onClick={() => setStep(STEP.INPUT)}>戻る</button>
        </div>
      )}
      {currentStep === STEP.COMPLETE && (
        <div>
          <p>登録が完了しました</p>
          <Link href={'/login'}>
            <a>ログイン画面へ</a>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Signup;
