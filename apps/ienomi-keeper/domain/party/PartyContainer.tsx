import React, { FC } from 'react';
import { useRequireAuth } from '../../hooks/useRequreAuth';
import { useParties } from './PartyHooksContext';

export const PartyContainer: FC = () => {
  const auth = useRequireAuth();
  const { parties, loading, error } = useParties();
  if (!auth) {
    return <div>Loading</div>;
  }

  return (
    <div>
      <h2>Party</h2>
    </div>
  );
};
