import React, { VFC } from 'react';
import { PartyRepository } from '@ienomi/repository';
import Link from 'next/link';
import { useForm } from 'react-hook-form';

type FormType = {
  name: string;
  startTime: Date;
  endTime: Date;
};

export const PartyNewContainer: VFC = () => {
  const { register, handleSubmit } = useForm<FormType>();
  const submit = ({ name }: FormType) => {
    PartyRepository.create({
      name: name,
      startTime: new Date(),
    });
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
