import React, { VFC } from 'react';
import Link from 'next/link';
import { useRequireAuth } from '../../hooks/useRequreAuth';

export const PartyContainer: VFC = () => {
  const auth = useRequireAuth();

  if (!auth) {
    return <div>Loading</div>;
  }

  return (
    <div>
      <h2>Party</h2>
      <h3>Menu</h3>
      <ul>
        <li>
          <Link href={'/party/new'}>新規作成</Link>
        </li>
        <li>
          <Link href={'/party/history'}>履歴</Link>
        </li>
      </ul>
    </div>
  );
};
