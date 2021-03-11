import { useCallback, useContext, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { AppRepository, PartyRepository } from '@ienomi/repository';
import { add } from 'date-fns';
import { useRouter } from 'next/router';
import {
  Controller,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import { number, object, string } from 'yup';
import { AuthContext } from '../domain/app/AuthContext';

type FormType = {
  name: string;
  time: number;
};

const DEFAULT_TIME = 5;
const MAX_TIME = 360;
const STEP_TIME = 5;

export const usePartyForm = () => {
  const router = useRouter();
  const auth = useContext(AuthContext);

  const [endTime, setEndTime] = useState<Date>(() => {
    const now = AppRepository.getServerTimestamp();
    return add(now, {
      minutes: DEFAULT_TIME,
    });
  });

  const schema = object().shape({
    name: string().required(),
    time: number().required(),
  });

  const onValid: SubmitHandler<FormType> = async ({ name, time }) => {
    const startTime = AppRepository.getServerTimestamp();
    const response = await PartyRepository.create({
      userId: auth.user.id,
      name,
      time,
      startTime,
      endTime,
    });

    await router.push(`/party/${response.id}`);
    return;
  };

  const onInValid: SubmitErrorHandler<FormType> = (errors) => {
    console.log({ errors });
  };

  const onChangeEnd = useCallback((time: number) => {
    const date = AppRepository.getServerTimestamp();
    const endTime = add(date, { minutes: time });
    setEndTime(endTime);
  }, []);

  const {
    handleSubmit,
    errors,
    control,
    formState: { isSubmitting },
  } = useForm<FormType>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      time: DEFAULT_TIME,
    },
  });

  const submit = handleSubmit(onValid, onInValid);

  return {
    submit,
    errors,
    control,
    isSubmitting,
    endTime,
    onChangeEnd,
    DEFAULT_TIME,
    MAX_TIME,
    STEP_TIME,
    Controller,
  };
};
