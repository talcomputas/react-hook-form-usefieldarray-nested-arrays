import { PositionType } from '.';
import { InputProps } from './InputProps';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export interface IPositionProps extends InputProps {
  nestIndex: number;
}

export default function Position({ nestIndex, defaultValues, register, errors }: IPositionProps) {
  return (
    <Card key={nestIndex}>
      <Form.Group as={Row}>
        <Form.Label column sm='1'>
          Latitude
        </Form.Label>
        <Col sm={6}>
          <Form.Control
            name={`list[${nestIndex}].latitude`}
            ref={register}
            isInvalid={!!(errors.list && errors.list[nestIndex] && errors.list[nestIndex].latitude)}
            defaultValue={defaultValues.latitude}
          ></Form.Control>
          {errors && errors.list && errors.list[nestIndex] && errors.list[nestIndex].latitude && (
            <Form.Control.Feedback type='invalid'>
              {errors.list[nestIndex].latitude.message}
            </Form.Control.Feedback>
          )}
        </Col>
      </Form.Group>

      <Form.Group as={Row}>
        <Form.Label column sm='1'>
          Logitude
        </Form.Label>
        <Col sm={6}>
          <Form.Control
            name={`list[${nestIndex}].longitude`}
            ref={register}
            isInvalid={
              !!(errors.list && errors.list[nestIndex] && errors.list[nestIndex].longitude)
            }
            defaultValue={defaultValues.longitude}
          ></Form.Control>
          {errors && errors.list && errors.list[nestIndex] && errors.list[nestIndex].longitude && (
            <Form.Control.Feedback type='invalid'>
              {errors.list[nestIndex].longitude.message}
            </Form.Control.Feedback>
          )}
        </Col>
      </Form.Group>
      <Form.Control
        readOnly
        name={`list[${nestIndex}].type`}
        ref={register}
        value={'position'}
      ></Form.Control>

      <Form.Control
        readOnly
        type='text'
        name={`list[${nestIndex}].id`}
        ref={register}
        defaultValue={defaultValues.id}
      />
    </Card>
  );
}
