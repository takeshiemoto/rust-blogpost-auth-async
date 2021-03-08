import React, { VFC } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { useParty } from './useParty';

type FormType = {
  name: string;
  startTime: Date;
  endTime: Date;
};

export const PartyNewContainer: VFC = () => {
  const { register, handleSubmit } = useForm<FormType>();
  const { createParty } = useParty();
  const submit = async ({ name }: FormType) => {
    createParty(name);
  };

  return (
    <div>
      <h2>New Party</h2>
      <Link href={'/party'}>一覧に戻る</Link>
      <form onSubmit={handleSubmit(submit)}>
        <div>
          <label>
            name
            <input type={'text'} ref={register} name={'name'} />
          </label>
        </div>
        <button>START</button>
      </form>
    </div>
  );
};
