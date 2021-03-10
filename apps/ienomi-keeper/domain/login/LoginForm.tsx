import React, { useCallback, useState } from 'react';
import {
  AlertDialog,
  Button,
  DialogContainer,
  Form,
  StatusLight,
  TextField,
} from '@adobe/react-spectrum';
import { yupResolver } from '@hookform/resolvers/yup';
import { MODAL_STATE, ModalState } from '@ienomi/const';
import { SessionRepository } from '@ienomi/repository';
import {
  useForm,
  Controller,
  SubmitErrorHandler,
  SubmitHandler,
  FieldError,
  DeepMap,
} from 'react-hook-form';
import { object, string } from 'yup';
import { FormType } from './type';

export const LoginForm = () => {
  const [isOpen, setModalState] = useState<ModalState>(MODAL_STATE.CLOSE);

  const schema = object().shape({
    email: string().required('メールアドレスを入力してください'),
    password: string().required('パスワードを入力してください'),
  });

  const {
    setError,
    errors,
    handleSubmit,
    formState,
    control,
  } = useForm<FormType>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onValid: SubmitHandler<FormType> = useCallback(
    async ({ email, password }) => {
      try {
        await SessionRepository.login({ email, password });
      } catch (error) {
        setError('email', {
          type: 'auth',
          message: 'メールアドレスまたはパスワードが正しくありません',
        });
        setError('password', {
          type: 'auth',
          message: 'メールアドレスまたはパスワードが正しくありません',
        });

        setModalState(MODAL_STATE.OPEN);
      }
    },
    [setError]
  );

  const onInValid: SubmitErrorHandler<FormType> = useCallback(() => {
    setModalState(MODAL_STATE.OPEN);
  }, []);

  return (
    <>
      <Form onSubmit={handleSubmit(onValid, onInValid)}>
        <Controller
          name={'email'}
          control={control}
          render={({ onChange, value }) => (
            <TextField
              label={'メールアドレス'}
              width={'size-3600'}
              maxWidth={'100%'}
              placeholder={'abc@ienomi.jp'}
              onChange={onChange}
              value={value}
              validationState={errors?.email ? 'invalid' : undefined}
            />
          )}
        />
        <Controller
          name={'password'}
          control={control}
          render={({ onChange, value }) => (
            <TextField
              type={'password'}
              label={'パスワード'}
              width={'size-3600'}
              maxWidth={'100%'}
              placeholder={'1234'}
              onChange={onChange}
              value={value}
              validationState={errors?.password ? 'invalid' : undefined}
            />
          )}
        />
        <Button
          variant={'cta'}
          marginTop={'size-400'}
          type={'submit'}
          isDisabled={formState.isSubmitting}
        >
          ログイン
        </Button>
      </Form>
      <DialogContainer onDismiss={() => setModalState(MODAL_STATE.CLOSE)}>
        {isOpen && (
          <AlertDialog
            title={'認証に失敗しました'}
            primaryActionLabel={'閉じる'}
          >
            {Object.keys(errors).map((field) => (
              <StatusLight key={field} variant={'negative'}>
                {(errors[field] as DeepMap<FieldError, FormType>).message}
              </StatusLight>
            ))}
          </AlertDialog>
        )}
      </DialogContainer>
    </>
  );
};
