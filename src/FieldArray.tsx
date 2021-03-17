import React from 'react';
import { useFieldArray } from 'react-hook-form';
import Button from 'react-bootstrap/Button';
import { InputProps } from './InputProps';
import NestedArray from './NestedFieldArray';
import Position from './Position';
import Select from './Select';
import Card from 'react-bootstrap/Card';

let renderCount = 0;

export default function FieldArray({ control, register, errors, setValue, getValues }: InputProps) {
  const { fields, append } = useFieldArray({
    keyName: 'guid',
    control,
    name: 'list',
  });
  renderCount++;
  return (
    <Card>
      {fields.map((item, index) => {
        return (
          <li key={index}>
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
                defaultValues={item}
                {...{ control, register, errors, setValue, getValues }}
              ></Position>
            )}
          </li>
        );
      })}

      <section>
        <Button
          variant='info'
          onClick={() => {
            append({ name: 'append' });
          }}
        >
          append
        </Button>

        <Button
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
        </Button>

        <Button
          type='button'
          onClick={() => {
            append({ name: 'select', type: 'select', value: '2' });
          }}
        >
          Select
        </Button>
        <Button
          type='button'
          onClick={() => {
            append({ name: 'position', type: 'position', latitude: '', longitude: '' });
          }}
        >
          Position
        </Button>

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
    </Card>
  );
}
