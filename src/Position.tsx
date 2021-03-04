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
      <input type='text' name={`test[${nestIndex}].latitude`} ref={register}></input>
      {errors && errors.test && errors.test[nestIndex] && errors.test[nestIndex].latitude && (
        <span style={{ backgroundColor: 'red', color: 'white' }}>
          {errors.test[nestIndex].latitude.message}
        </span>
      )}
      <input type='text' name={`test[${nestIndex}].longitude`} ref={register}></input>
      {errors && errors.test && errors.test[nestIndex] && errors.test[nestIndex].longitude && (
        <span style={{ backgroundColor: 'red', color: 'white' }}>
          {errors.test[nestIndex].longitude.message}
        </span>
      )}
      <input
        readOnly
        type='text'
        ref={register}
        name={`test[${nestIndex}].type`}
        value={'position'}
      />
      {errors && errors.test && errors.test[nestIndex] && errors.test[nestIndex].longitude && (
        <span style={{ backgroundColor: 'red', color: 'white' }}>
          {errors.test[nestIndex].longitude.message}
        </span>
      )}
    </div>
  );
}
