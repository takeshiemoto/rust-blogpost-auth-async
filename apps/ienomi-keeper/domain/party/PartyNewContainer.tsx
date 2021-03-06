import React, { VFC } from 'react';
import { PartyRepository } from '@ienomi/repository';
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
      // TODO 時間指定できるようにする
      startTime: new Date(),
      endTime: new Date(),
    });
  };

  return (
    <div>
      <h2>New Party</h2>
      <form onSubmit={handleSubmit(submit)}>
        <div>
          <label>
            name
            <input type={'text'} ref={register} name={'name'} />
          </label>
        </div>
        <div>
          <label>
            Start
            <input type={'date'} ref={register} name={'startTime'} />
          </label>
        </div>
        <div>
          <label>
            End
            <input type={'date'} ref={register} name={'endTime'} />
          </label>
        </div>
        <button>Add</button>
      </form>
    </div>
  );
};
