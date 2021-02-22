import React from 'react';
import Link from 'next/link';

export const Complete = () => {
  return (
    <div>
      <h2>Complete</h2>
      <p>登録が完了しました</p>
      <Link href={'/'}>
        <a>トップページへ</a>
      </Link>
    </div>
  );
};

export default Complete;
