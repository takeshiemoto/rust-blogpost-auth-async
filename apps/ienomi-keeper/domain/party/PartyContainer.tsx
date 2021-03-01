import React, { FC } from 'react';
import { useRequireAuth } from '../../hooks/useRequreAuth';

export const PartyContainer: FC = () => {
  const auth = useRequireAuth();

  if (!auth) {
    return <div>Loading</div>;
  }

  return (
    <div>
      <h2>Party</h2>
    </div>
  );
};
