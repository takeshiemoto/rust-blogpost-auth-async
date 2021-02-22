import React, { useContext, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { SignUpContext } from '../../context/SingUp';

export const Complete = () => {
  const router = useRouter();
  const { user } = useContext(SignUpContext);

  useEffect(() => {
    !user && router.push('/singup');
  }, [router, user]);

  return (
    <div>
      {user && (
        <>
          <h2>Complete</h2>
          <p>登録が完了しました</p>
          <Link href={'/'}>
            <a>トップページへ</a>
          </Link>
        </>
      )}
    </div>
  );
};

export default Complete;
