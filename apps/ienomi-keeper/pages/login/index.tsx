import React, { useContext, useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { SessionRepository } from '@ienomi/repository';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { object, string } from 'yup';
import { AuthContext } from '../../context/Auth';

type FormType = { email: string; password: string };

const Login = () => {
  const router = useRouter();
  const auth = useContext(AuthContext);

  const schema = object().shape({
    email: string().required('メールアドレスを入力してください'),
    password: string().required('パスワードを入力してください'),
  });
  const {
    register,
    handleSubmit,
    setError,
    errors,
    formState,
  } = useForm<FormType>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  useEffect(() => {
    auth?.uid && router.replace('/');
  }, [auth, router]);

  const onSubmit = async ({ email, password }: FormType) => {
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
  };

  return (
    <div>
      <h2>Login</h2>
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
            onClick={handleSubmit(onSubmit)}
            disabled={formState.isSubmitting}
          >
            ログイン
          </button>
        </div>
      </form>
      <Link href={'/singup'}>
        <a>新規会員登録</a>
      </Link>
    </div>
  );
};

export default Login;
