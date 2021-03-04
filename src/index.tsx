import React from 'react';
import { useForm } from 'react-hook-form';
import ReactDOM from 'react-dom';
// import * as yup from 'yup';
// import { yupResolver } from '@hookform/resolvers/yup';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';

import './styles.css';
import FieldArray from './FieldArray';
import { parsePhoneNumber } from 'libphonenumber-js';

export type nestedArrayType = {
  field1: string;
  field2: string;
};

export type formArrayData = {
  name: string;
  nestedArray?: nestedArrayType[];
};

type FormData = {
  list: formArrayData[];
};

const defaultValues: FormData = {
  list: [],
};

const selectSchema = Joi.object().keys({
  color: Joi.string().equal('yellow').required(),
  type: Joi.string().equal('select').required(),
});

const positionSchema = Joi.object().keys({
  latitude: Joi.string().alphanum().min(1).max(4).required(),
  longitude: Joi.string().min(1).max(4).required(),
  type: Joi.string().min(1).required(),
});

const arraySchema = Joi.array().items(selectSchema, positionSchema).required();

/*const arraySchema = Joi.array()
  .items(Joi.when('type', { is: 'select', then: selectSchema }))
  .min(1)
  .required();*/

const isValidPhoneNumber = (phoneNumber: string, helper: { error: (arg0: string) => any }) => {
  const res = parsePhoneNumber(phoneNumber, 'NO');
  console.log(res);
  if (res !== undefined && res.isValid()) {
    return phoneNumber;
  }
  // return helper.error;
  return helper.error('phoneNumber.invalid');
};

const phoneNumberSchema = Joi.string()
  .custom(isValidPhoneNumber)
  .message('phoneNumber is invalid')
  .required();

const validationSchema = Joi.object({
  username: Joi.string().alphanum().min(6).max(30).required(),
  age: Joi.string().alphanum().min(3).max(30).required(),
  phoneNumber: phoneNumberSchema,
  list: Joi.array()
    .items(
      Joi.alternatives().conditional('.type', {
        switch: [
          { is: 'select', then: selectSchema },
          { is: 'position', then: positionSchema },
        ],
      })
    )
    .min(1)
    .required(),
});

/*const resolver = (data: any) => {
  const { error, value: values } = validationSchema.validate(data, {
    abortEarly: false,
    stripUnknown: false,
  });
  return {
    values: error ? {} : values,
    errors: error
      ? error.details.reduce((previous, currentError) => {
          console.log('prev');
          console.log(currentError);
          return {
            ...previous,
            [currentError.path[0]]: currentError,
          };
        }, {})
      : {},
  };
};*/

function App() {
  /*const { control, register, handleSubmit, getValues, errors, reset, setValue } = useForm({
    resolver: joiResolver(schema),
    // defaultValues: defaultValues,
  });*/
  const defaultValues = {
    username: 'Trond2',
    age: 479,
    phoneNumber: '+47 97955731',
    list: [],
  };

  const { control, register, handleSubmit, reset, errors, getValues, setValue } = useForm({
    resolver: joiResolver(validationSchema),
    defaultValues,
  });

  // const onSubmit = (data: any) => console.log('data', data);

  return (
    <form onSubmit={handleSubmit((d) => console.log(d))}>
      <input type='text' name='username' ref={register} />
      {errors && errors.username && (
        <span style={{ backgroundColor: 'red', color: 'white' }}>{errors.username.message}</span>
      )}
      <input type='text' name='age' ref={register} />
      {errors && errors.age && (
        <span style={{ backgroundColor: 'red', color: 'white' }}>{errors.age.message}</span>
      )}
      <input type='text' name='phoneNumber' ref={register} />
      {errors && errors.phoneNumber && (
        <span style={{ backgroundColor: 'red', color: 'white' }}>{errors.phoneNumber.message}</span>
      )}
      <FieldArray {...{ control, register, defaultValues, getValues, setValue, errors }} />
      {errors && errors.list && (
        <span style={{ backgroundColor: 'red', color: 'white' }}>
          {JSON.stringify(errors.list)}
        </span>
      )}

      <div style={{ color: 'red' }}>
        <pre>
          {Object.keys(errors).length > 0 && <label>{JSON.stringify(errors, null, 2)}</label>}
        </pre>
      </div>

      <button type='button' onClick={() => reset(defaultValues)}>
        Reset
      </button>
      <input type='submit' />
    </form>
  );
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
