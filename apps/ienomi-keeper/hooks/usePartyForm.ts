import { useContext } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { AppRepository, PartyRepository } from '@ienomi/repository';
import { useRouter } from 'next/router';
import {
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
  Controller,
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

  const schema = object().shape({
    name: string().required(),
    time: number().required(),
  });

  const onValid: SubmitHandler<FormType> = async ({ name, time }) => {
    const startTime = await AppRepository.getServerTimestamp();
    const response = await PartyRepository.create({
      userId: auth.user.id,
      name,
      time,
      startTime,
    });

    await router.push(`/party/${response.id}`);
    return;
  };

  const onInValid: SubmitErrorHandler<FormType> = (errors) => {
    console.log({ errors });
  };

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
    Controller,
    DEFAULT_TIME,
    MAX_TIME,
    STEP_TIME,
  };
};
