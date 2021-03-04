import React from 'react';
import { useFieldArray } from 'react-hook-form';
import { InputProps } from './InputProps';

export interface IPositionProps extends InputProps {
  nestIndex: number;
}

export default function Position({
  nestIndex,
  control,
  register,
  errors,
  setValue,
  getValues,
}: IPositionProps) {
  return (
    <div>
      <input type='text' name={`list[${nestIndex}].latitude`} ref={register}></input>
      {errors && errors.list && errors.list[nestIndex] && errors.list[nestIndex].latitude && (
        <span style={{ backgroundColor: 'red', color: 'white' }}>
          {errors.list[nestIndex].latitude.message}
        </span>
      )}
      <input type='text' name={`list[${nestIndex}].longitude`} ref={register}></input>
      {errors && errors.list && errors.list[nestIndex] && errors.list[nestIndex].longitude && (
        <span style={{ backgroundColor: 'red', color: 'white' }}>
          {errors.list[nestIndex].longitude.message}
        </span>
      )}
      <input
        readOnly
        type='text'
        ref={register}
        name={`list[${nestIndex}].type`}
        value={'position'}
      />
      {errors && errors.list && errors.list[nestIndex] && errors.list[nestIndex].longitude && (
        <span style={{ backgroundColor: 'red', color: 'white' }}>
          {errors.list[nestIndex].longitude.message}
        </span>
      )}
    </div>
  );
}
