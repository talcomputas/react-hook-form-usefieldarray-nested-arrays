import React from 'react';
import { useFieldArray } from 'react-hook-form';
import { InputProps } from './InputProps';
import NestedArray from './NestedFieldArray';
import Position from './Position';
import Select from './Select';

let renderCount = 0;

export default function FieldArray({ control, register, errors, setValue, getValues }: InputProps) {
  const { fields, append } = useFieldArray({
    keyName: 'guid',
    control,
    name: 'list',
  });
  renderCount++;

  return (
    <>
      <ul>
        {fields.map((item, index) => {
          return (
            <li key={item.id}>
              {item.type === 'select' && (
                <Select
                  nestIndex={index}
                  defaultValue={item}
                  {...{ control, register, errors, setValue, getValues }}
                ></Select>
              )}

              {item.type === 'position' && (
                <Position
                  nestIndex={index}
                  defaultValue={item}
                  {...{ control, register, errors, setValue, getValues }}
                ></Position>
              )}

              {/* <input name={`test[${index}].name`} ref={register()} defaultValue={item.name} />
              {errors && errors.test && errors.test[index] && errors.test[index].name && (
                <span style={{ backgroundColor: 'red', color: 'white' }}>
                  {JSON.stringify(errors.test[index].name.message)}
                </span>
              )}
              <button type='button' onClick={() => remove(index)}>
                Delete
              </button>
              <NestedArray
                nestIndex={index}
                {...{ control, register, errors, setValue, getValues }}
              />
              <Select
                nestIndex={index}
                {...{ control, register, errors, setValue, getValues }}
              ></Select> */}
            </li>
          );
        })}
      </ul>

      <section>
        <button
          type='button'
          onClick={() => {
            append({ name: 'append' });
          }}
        >
          append
        </button>

        <button
          type='button'
          onClick={() => {
            setValue('test', [
              ...getValues().test,
              {
                name: 'append',
                nestedArray: [{ field1: 'field1', field2: 'field2' }],
              },
            ]);
          }}
        >
          Append Nested
        </button>

        <button
          type='button'
          onClick={() => {
            append({ name: 'select', type: 'select', value: '2' });
          }}
        >
          Select
        </button>
        <button
          type='button'
          onClick={() => {
            append({ name: 'position', type: 'position', latitude: '', longitude: '' });
          }}
        >
          Position
        </button>

        {/* <button
          type='button'
          onClick={() => {
            setValue('test', [
              ...getValues().test,
              {
                name: 'selectArray',
                selectArray: [{ ocupation: 'developer' }],
              },
            ]);
          }}
        >
          Append Select
        </button> */}

        {/* <button
          type='button'
          onClick={() => {
            prepend({ name: 'append' });
          }}
        >
          prepend
        </button>
 */}
        {/* <button
          type='button'
          onClick={() => {
            setValue('test', [
              {
                name: 'append',
                nestedArray: [{ field1: 'Prepend', field2: 'Prepend' }],
              },
              ...getValues().test,
            ]);
          }}
        >
          prepend Nested
        </button> */}
      </section>

      <span className='counter'>Render Count: {renderCount}</span>
    </>
  );
}

/* const FieldArray: FC<InputProps> = ({ control, register, errors, setValue, getValues }) => {
  const { fields, append, remove, prepend } = useFieldArray({
    control,
    name: 'test',
  });

  renderCount++;

  return (
    <>
      <ul>
        {fields.map((item, index) => {
          return (
            <li key={item.id}>
              <input name={`test[${index}].name`} ref={register()} defaultValue={item.name} />

              <button type='button' onClick={() => remove(index)}>
                Delete
              </button>
              <NestedArray nestIndex={index} {...{ control, register }} />
            </li>
          );
        })}
      </ul>

      <section>
        <button
          type='button'
          onClick={() => {
            append({ name: 'append' });
          }}
        >
          append
        </button>

        <button
          type='button'
          onClick={() => {
            setValue('test', [
              ...getValues().test,
              {
                name: 'append',
                nestedArray: [{ field1: 'append', field2: 'append' }],
              },
            ]);
          }}
        >
          Append Nested
        </button>

        <button
          type='button'
          onClick={() => {
            prepend({ name: 'append' });
          }}
        >
          prepend
        </button>

        <button
          type='button'
          onClick={() => {
            setValue('test', [
              {
                name: 'append',
                nestedArray: [{ field1: 'Prepend', field2: 'Prepend' }],
              },
              ...getValues().test,
            ]);
          }}
        >
          prepend Nested
        </button>
      </section>

      <span className='counter'>Render Count: {renderCount}</span>
    </>
  );
};

export default FieldArray; */
