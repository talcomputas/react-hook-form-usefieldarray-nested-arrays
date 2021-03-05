import { PositionType } from '.';
import { InputProps } from './InputProps';

export interface IPositionProps extends InputProps {
  nestIndex: number;
  defaultValue: any;
}

export default function Position({ nestIndex, defaultValue, register, errors }: IPositionProps) {
  return (
    <div>
      <input
        type='text'
        name={`list[${nestIndex}].latitude`}
        ref={register}
        defaultValue={defaultValue.latitude}
      ></input>
      {errors && errors.list && errors.list[nestIndex] && errors.list[nestIndex].latitude && (
        <span style={{ backgroundColor: 'red', color: 'white' }}>
          {errors.list[nestIndex].latitude.message}
        </span>
      )}
      <input
        type='text'
        name={`list[${nestIndex}].longitude`}
        defaultValue={defaultValue.longitude}
        ref={register}
      ></input>
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
      <input
        readOnly
        type='text'
        name={`list[${nestIndex}].id`}
        ref={register}
        defaultValue={defaultValue.id}
      />
      {errors && errors.list && errors.list[nestIndex] && errors.list[nestIndex].longitude && (
        <span style={{ backgroundColor: 'red', color: 'white' }}>
          {errors.list[nestIndex].longitude.message}
        </span>
      )}
    </div>
  );
}
