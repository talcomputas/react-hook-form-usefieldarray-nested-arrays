import React from 'react';
import { InputProps } from './InputProps';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

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
    <Card bg='light'>
      <Form.Group>
        <Form.Control
          as='select'
          name={`list[${nestIndex}].color`}
          ref={register}
          defaultValue={defaultValue.color}
          isInvalid={!!(errors.list && errors.list[nestIndex] && errors.list[nestIndex].color)}
        >
          <option value={'red'}>red</option>
          <option value={'blue'}>blue</option>
          <option value={'yellow'}>yellow</option>
        </Form.Control>
        {errors && errors.list && errors.list[nestIndex] && errors.list[nestIndex].color && (
          <Form.Control.Feedback type='invalid'>
            {errors.list[nestIndex].color.message}
          </Form.Control.Feedback>
        )}
      </Form.Group>
      <Form.Control
        readOnly
        name={`list[${nestIndex}].type`}
        ref={register}
        defaultValue={defaultValue.type}
      ></Form.Control>

      <Form.Control
        readOnly
        type='text'
        name={`list[${nestIndex}].id`}
        ref={register}
        defaultValue={defaultValue.id}
      />
      {errors && errors.list && errors.list[nestIndex] && errors.list[nestIndex].type && (
        <span style={{ backgroundColor: 'red', color: 'white' }}>
          {errors.list[nestIndex].type.message}
        </span>
      )}
    </Card>
  );
}
