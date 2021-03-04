import React from 'react';
import { InputProps } from './InputProps';

export interface ISelectProps extends InputProps {
  nestIndex: number;
}

export default function Select({ nestIndex, register, errors }: ISelectProps) {
  return (
    <div>
      <select name={`test[${nestIndex}].bobbo`} ref={register}>
        <option value='1'>1</option>
        <option value='2'>2</option>
        <option value='300000'>300000</option>
      </select>
      {errors && errors.test && errors.test[nestIndex] && errors.test[nestIndex].bobbo && (
        <span style={{ backgroundColor: 'red', color: 'white' }}>
          {JSON.stringify(errors.test[nestIndex].bobbo)}
        </span>
      )}
      <input
        readOnly
        type='text'
        ref={register}
        name={`test[${nestIndex}].type`}
        defaultValue={'select'}
      />
      {errors && errors.test && errors.test[nestIndex] && errors.test[nestIndex].type && (
        <span style={{ backgroundColor: 'red', color: 'white' }}>
          {JSON.stringify(errors.test[nestIndex].type)}
        </span>
      )}
    </div>
  );
}
