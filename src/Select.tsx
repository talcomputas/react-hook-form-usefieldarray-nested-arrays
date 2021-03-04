import React from 'react';
import { InputProps } from './InputProps';

export interface ISelectProps extends InputProps {
  nestIndex: number;
}

export default function Select({ nestIndex, register, errors }: ISelectProps) {
  return (
    <div>
      <select name={`list[${nestIndex}].color`} ref={register}>
        <option value={'red'}>red</option>
        <option value={'blue'}>blue</option>
        <option value={'yellow'}>yellow</option>
      </select>
      {errors && errors.list && errors.list[nestIndex] && errors.list[nestIndex].color && (
        <span style={{ backgroundColor: 'red', color: 'white' }}>
          {JSON.stringify(errors.list[nestIndex].color)}
        </span>
      )}
      <input
        readOnly
        type='text'
        ref={register}
        name={`list[${nestIndex}].type`}
        defaultValue={'select'}
      />
      {errors && errors.list && errors.list[nestIndex] && errors.list[nestIndex].type && (
        <span style={{ backgroundColor: 'red', color: 'white' }}>
          {JSON.stringify(errors.list[nestIndex].type)}
        </span>
      )}
    </div>
  );
}
