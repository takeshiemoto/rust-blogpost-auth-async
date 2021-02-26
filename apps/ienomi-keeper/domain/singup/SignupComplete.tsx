import React, { FC, useContext, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { SignUpContext } from './SignupContext';

export const SignupComplete: FC = () => {
  const router = useRouter();
  const { user } = useContext(SignUpContext);

  useEffect(() => {
    !user && router.push('/signup');
  }, [router, user]);

  return (
    <div>
      {user && (
        <>
          <p>登録が完了しました</p>
          <Link href={'/'}>トップページへ</Link>
        </>
      )}
    </div>
  );
};
