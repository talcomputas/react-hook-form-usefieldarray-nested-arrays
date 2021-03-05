import React from 'react';
import { InputProps } from './InputProps';

export interface IPosition {
  color: string;
  type: string;
}

export interface ISelectProps extends InputProps {
  nestIndex: number;
  defaultValue: any;
}

export default function Select({ nestIndex, defaultValue, register, errors }: ISelectProps) {
  return (
    <div>
      <select name={`list[${nestIndex}].color`} ref={register} defaultValue={defaultValue.color}>
        <option value={'red'}>red</option>
        <option value={'blue'}>blue</option>
        <option value={'yellow'}>yellow</option>
      </select>
      {errors && errors.list && errors.list[nestIndex] && errors.list[nestIndex].color && (
        <span style={{ backgroundColor: 'red', color: 'white' }}>
          {errors.list[nestIndex].color.message}
        </span>
      )}
      <input
        readOnly
        type='text'
        ref={register}
        name={`list[${nestIndex}].type`}
        defaultValue={defaultValue.type}
      />
      {errors && errors.list && errors.list[nestIndex] && errors.list[nestIndex].type && (
        <span style={{ backgroundColor: 'red', color: 'white' }}>
          {errors.list[nestIndex].type.message}
        </span>
      )}
    </div>
  );
}
