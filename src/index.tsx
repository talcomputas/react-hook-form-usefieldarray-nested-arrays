import React from 'react';
import { useForm } from 'react-hook-form';
import ReactDOM from 'react-dom';
// import * as yup from 'yup';
// import { yupResolver } from '@hookform/resolvers/yup';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi, { string } from 'joi';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './styles.scss';
import FieldArray from './FieldArray';
import { parsePhoneNumber } from 'libphonenumber-js';
import Product from './Product';

/*export type nestedArrayType = {
  field1: string;
  field2: string;
};

export type ArrayData = {
  nestedArray?: nestedArrayType[];
};*/

export interface ISavable {
  id: string;
  type: string;
}

export interface ISelect extends ISavable {
  color: string;
}

export interface IValue extends ISavable {
  min: number;
  max: number;
  step: number;
  unit: string;
}
export interface IPosition extends ISavable {
  latitude: string;
  longitude: string;
  type: string;
  alts: IValue[];
}

type FormData = {
  username: string;
  age: number;
  list: Array<ISelect | IPosition>;
  phoneNumber: string;
  product: string;
};

const selectSchema = Joi.object().keys({
  id: Joi.string().allow(null, '').required(),
  color: Joi.string().equal('yellow').required(),
  type: Joi.string().equal('select').required(),
});

const valueSchema = Joi.object().keys({
  id: Joi.string().required(),
  type: Joi.string().equal('value').required(),
  step: Joi.number().min(100).max(1000000000).required(),
  min: Joi.number().min(0).max(1000000000).required(),
  max: Joi.number().min(0).max(1000000000).required(),
  unit: Joi.string().required(),
});

const codelistSchema = Joi.object().keys({
  type: Joi.string().equal('codelist').required(),
  codelist: Joi.string().required(),
});

const positionSchema = Joi.object().keys({
  id: Joi.string().allow(null, '').required(),
  latitude: Joi.string().alphanum().min(1).max(4).required(),
  longitude: Joi.string().min(1).max(4).required(),
  type: Joi.string().min(1).required(),
  alts: Joi.array().items(
    Joi.alternatives().conditional('.type', {
      switch: [
        { is: 'value', then: valueSchema },
        { is: 'codelist', then: codelistSchema },
      ],
    })
  ),
});

// const arraySchema = Joi.array().items(selectSchema, positionSchema).required();

/*const arraySchema = Joi.array()
  .items(Joi.when('type', { is: 'select', then: selectSchema }))
  .min(1)
  .required();*/

const isValidPhoneNumber = (phoneNumber: string, helper: { error: (arg0: string) => any }) => {
  const res = parsePhoneNumber(phoneNumber, 'NO');
  if (res !== undefined && res.isValid()) {
    return phoneNumber;
  }
  // return helper.error;
  return helper.error('phoneNumber.invalid');
};

const phoneNumberSchema = Joi.string()
  .custom(isValidPhoneNumber)
  .message('phoneNumber is invalid')
  .required();

const productSchema = Joi.string().required();

const validationSchema = Joi.object({
  username: Joi.string().alphanum().min(6).max(30).required(),
  age: Joi.string().alphanum().min(3).max(30).required(),
  phoneNumber: phoneNumberSchema,
  list: Joi.array()
    .items(
      Joi.alternatives().conditional('.type', {
        switch: [
          { is: 'select', then: selectSchema },
          { is: 'position', then: positionSchema },
        ],
      })
    )
    .min(1)
    .required(),
  product: productSchema,
});

/*const resolver = (data: any) => {
  const { error, value: values } = validationSchema.validate(data, {
    abortEarly: false,
    stripUnknown: false,
  });
  return {
    values: error ? {} : values,
    errors: error
      ? error.details.reduce((previous, currentError) => {
          console.log('prev');
          console.log(currentError);
          return {
            ...previous,
            [currentError.path[0]]: currentError,
          };
        }, {})
      : {},
  };
};*/

function App() {
  /*const { control, register, handleSubmit, getValues, errors, reset, setValue } = useForm({
    resolver: joiResolver(schema),
    // defaultValues: defaultValues,
  });*/
  const defaultValues: FormData = {
    username: 'Trond2',
    age: 479,
    phoneNumber: '+47 97955731',
    list: [
      {
        id: '22222222',
        type: 'select',
        color: 'blue',
      },
      {
        id: '333333',
        type: 'position',
        latitude: '30',
        longitude: '40',
        alts: [
          {
            id: '46745645',
            type: 'value',
            min: 10,
            max: 100,
            step: 1,
            unit: '',
          },
        ],
      },
    ],
    product: 'Tesla Model SSSS',
  };

  const { control, register, handleSubmit, reset, errors, getValues, setValue } = useForm<FormData>(
    {
      resolver: joiResolver(validationSchema),
      defaultValues,
    }
  );

  // const onSubmit = (data: any) => console.log('data', data);

  return (
    <Card bg='light'>
      <Form onSubmit={handleSubmit((d) => console.log(d))} autoComplete='off' noValidate>
        <Form.Group as={Row}>
          <Form.Label column sm='1'>
            Username
          </Form.Label>
          <Col sm={6}>
            <Form.Control
              name='username'
              ref={register}
              isInvalid={!!errors.username}
            ></Form.Control>
            {errors && errors.username && (
              <Form.Control.Feedback type='invalid'>
                {errors.username?.message}
              </Form.Control.Feedback>
            )}
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Form.Label column sm='1'>
            Age
          </Form.Label>
          <Col sm={6}>
            <Form.Control name='age' ref={register} isInvalid={!!errors.age}></Form.Control>
            {errors && errors.age && (
              <Form.Control.Feedback type='invalid'>{errors.age?.message}</Form.Control.Feedback>
            )}
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label column sm='1'>
            Phonenumber
          </Form.Label>
          <Col sm={6}>
            <Form.Control
              name='phoneNumber'
              ref={register}
              isInvalid={!!errors.phoneNumber}
            ></Form.Control>
            {errors && errors.phoneNumber && (
              <Form.Control.Feedback type='invalid'>
                {errors.phoneNumber?.message}
              </Form.Control.Feedback>
            )}
          </Col>
        </Form.Group>
        <FieldArray {...{ control, register, getValues, setValue, errors }} />

        <Product
          {...{
            control,
            register,
            getValues,
            setValue,
            errors,
            defaultValues,
            // defaultValue: defaultValues.product,
          }}
        />

        <div style={{ color: 'red' }}>
          <pre>
            {Object.keys(errors).length > 0 && <label>{JSON.stringify(errors, null, 2)}</label>}
          </pre>
        </div>

        <Button variant='primary' type='submit'>
          Submit
        </Button>
        <Button variant='warning' onClick={() => reset(defaultValues)}>
          Reset
        </Button>
      </Form>
    </Card>
  );
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
