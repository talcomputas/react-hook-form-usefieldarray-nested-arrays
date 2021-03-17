import React, { ReactElement, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useFieldArray } from 'react-hook-form';
import { InputProps } from './InputProps';
import ValueAlternative from './ValueAlternative';

interface IProps extends InputProps {
  nestIndex: number;
  altIndex: number;
  prefix: string;
}

export default function AlternativeArray({
  control,
  register,
  errors,
  getValues,
  setValue,
  prefix,
  nestIndex,
}: IProps): ReactElement {
  const { fields, append } = useFieldArray({
    keyName: 'guid',
    control,
    name: `${prefix}`,
  });

  return (
    <Card bg='info'>
      <Card.Header>Alts array</Card.Header>
      <Card.Body>
        {fields.map((item, index) => {
          return (
            <div key={item.id}>
              {item.type === 'value' && (
                <ValueAlternative
                  nestIndex={nestIndex}
                  altIndex={index}
                  prefix={`${prefix}[${index}]`}
                  item={item}
                  {...{
                    control,
                    register,
                    errors,
                    getValues,
                    setValue,
                  }}
                />
              )}
            </div>
          );
        })}
        <Button
          onClick={() => {
            append({
              id: '435345345',
              min: 2,
              max: 99,
              step: 3,
              unit: 'GB',
              type: 'value',
            });
          }}
        >
          Append Position
        </Button>
      </Card.Body>
    </Card>
  );
}
