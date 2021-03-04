import React from 'react';
import { useForm } from 'react-hook-form';
import ReactDOM from 'react-dom';
// import * as yup from 'yup';
// import { yupResolver } from '@hookform/resolvers/yup';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';

import './styles.css';
import FieldArray from './FieldArray';

export type nestedArrayType = {
  field1: string;
  field2: string;
};

export type formArrayData = {
  name: string;
  nestedArray?: nestedArrayType[];
};

type FormData = {
  test: formArrayData[];
};

const defaultValues: FormData = {
  test: [],
};

const selectSchema = {
  bobbo: Joi.string().alphanum().min(3).max(6).required(),
  type: Joi.string().min(1).required(),
};

const positionSchema = Joi.object().keys({
  latitude: Joi.string().alphanum().min(1).max(4).required(),
  longitude: Joi.string().min(1).max(4).required(),
  type: Joi.string().min(1).required(),
});

const arraySchema = Joi.array().items(selectSchema, positionSchema).min(1).required();

const validationSchema = Joi.object({
  username: Joi.string().alphanum().min(6).max(30).required(),
  age: Joi.string().alphanum().min(3).max(30).required(),
  test: Joi.alternatives().try(arraySchema),
});

const resolver = (data: any) => {
  const { error, value: values } = validationSchema.validate(data, {
    abortEarly: false,
    stripUnknown: false,
  });

  return {
    values: error ? {} : values,
    errors: error
      ? error.details.reduce((previous, currentError) => {
          return {
            ...previous,
            [currentError.path[0]]: currentError,
          };
        }, {})
      : {},
  };
};

function App() {
  /*const { control, register, handleSubmit, getValues, errors, reset, setValue } = useForm({
    resolver: joiResolver(schema),
    // defaultValues: defaultValues,
  });*/
  const defaultValues = {
    username: 'Trond2',
    age: 479,
  };

  const { control, register, handleSubmit, reset, errors, getValues, setValue } = useForm({
    resolver,
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
      <FieldArray {...{ control, register, defaultValues, getValues, setValue, errors }} />

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
