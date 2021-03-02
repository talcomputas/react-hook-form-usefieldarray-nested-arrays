import React from 'react';
import { useForm } from 'react-hook-form';
import ReactDOM from 'react-dom';

import './styles.css';
import FieldArray from './FieldArray';

export type nestedArrayType = {
  field1: string;
  field2: string;
};

export type formArrayData = {
  name: string;
  nestedArray: nestedArrayType[];
};

type FormData = {
  test: formArrayData[];
};

const defaultValues: FormData = {
  test: [
    {
      name: 'useFieldArray1',
      nestedArray: [{ field1: 'field1', field2: 'field2' }],
    },
    {
      name: 'useFieldArray2',
      nestedArray: [{ field1: 'field1', field2: 'field2' }],
    },
  ],
};

function App() {
  const { control, register, handleSubmit, getValues, errors, reset, setValue } = useForm<FormData>(
    {
      defaultValues: defaultValues,
    }
  );

  const onSubmit = (data: any) => console.log('data', data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FieldArray {...{ control, register, defaultValues, getValues, setValue, errors }} />

      <button type='button' onClick={() => reset(defaultValues)}>
        Reset
      </button>

      <input type='submit' />
    </form>
  );
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
