import React, { ReactElement, useState } from 'react';
import { InputProps } from './InputProps';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

interface IProps extends InputProps {
  item: any;
  prefix: string;
}

export default function ValueAlternative({
  register,
  errors,
  defaultValues,
  item,
  prefix,
}: IProps) {
  return (
    <Form.Group>
      <Form.Label>
        <Form.Control type='input' name={`${prefix}.id`} defaultValue={item.id} ref={register} />
        <Form.Control type='input' name={`${prefix}.min`} defaultValue={item.min} ref={register} />
        <Form.Control type='input' name={`${prefix}.max`} defaultValue={item.max} ref={register} />
        <Form.Control
          type='input'
          name={`${prefix}.step`}
          defaultValue={item.step}
          ref={register}
        />
        <Form.Control
          type='input'
          name={`${prefix}.unit`}
          defaultValue={item.unit}
          ref={register}
        />
        <Form.Control type='input' name={`${prefix}.type`} defaultValue='value' ref={register} />
      </Form.Label>
    </Form.Group>
  );
}
