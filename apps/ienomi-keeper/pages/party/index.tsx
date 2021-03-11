import React from 'react';
import { Button, Flex, Form, Slider, TextField } from '@adobe/react-spectrum';
import { format } from 'date-fns';
import { Loading } from '../../components/Loading';
import { usePartyForm } from '../../hooks/usePartyForm';
import { useRequireAuth } from '../../hooks/useRequreAuth';

const Party = () => {
  const auth = useRequireAuth();

  const {
    submit,
    errors,
    control,
    isSubmitting,
    endTime,
    onChangeEnd,
    Controller,
    DEFAULT_TIME,
    MAX_TIME,
    STEP_TIME,
  } = usePartyForm();

  if (!auth.user || isSubmitting) {
    return <Loading />;
  }

  return (
    <Flex
      minHeight={'100vh'}
      justifyContent={'center'}
      alignItems={'center'}
      direction={'column'}
      width={'100%'}
    >
      <Form maxWidth={'size-3000'} onSubmit={submit}>
        <Controller
          name={'name'}
          control={control}
          render={({ onChange, value }) => (
            <TextField
              onChange={onChange}
              value={value}
              label={'Party Name'}
              width={'size-3000'}
              maxWidth={'100%'}
              validationState={errors?.name ? 'invalid' : undefined}
            />
          )}
        />
        <Controller
          name={'time'}
          control={control}
          render={({ onChange, value }) => (
            <Slider
              label={'Time (min)'}
              marginTop={'size-300'}
              defaultValue={DEFAULT_TIME}
              minValue={DEFAULT_TIME}
              maxValue={MAX_TIME}
              step={STEP_TIME}
              onChangeEnd={onChangeEnd}
              onChange={onChange}
              value={value}
            />
          )}
        />
        <p style={{ textAlign: 'center' }}>
          End of Time: {format(endTime, 'HH:mm')}
        </p>
        <Button variant={'cta'} marginTop={'size-300'} type={'submit'}>
          START
        </Button>
      </Form>
    </Flex>
  );
};

export default Party;
