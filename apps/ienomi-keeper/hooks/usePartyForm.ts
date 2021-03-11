import { useContext } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
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
  const auth = useContext(AuthContext);

  const schema = object().shape({
    name: string().required(),
    time: number().required(),
  });

  const onValid: SubmitHandler<FormType> = ({ name, time }) => {
    console.log({ auth });
    console.log(name);
    console.log(time);
  };

  const onInValid: SubmitErrorHandler<FormType> = (errors) => {
    console.log({ errors });
  };

  const { handleSubmit, errors, control } = useForm<FormType>({
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
    Controller,
    DEFAULT_TIME,
    MAX_TIME,
    STEP_TIME,
  };
};
