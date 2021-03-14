import { InputProps } from './InputProps';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export interface IProductProps extends InputProps {
  defaultValue: any;
}

export default function Product({ register, errors, defaultValue }: IProductProps) {
  return (
    <Form.Group>
      <Form.Group as={Row}>
        <Form.Label column sm='1'>
          Product
        </Form.Label>
        <Col sm={6}>
          <Form.Control name='product' ref={register} isInvalid={!!errors.product}></Form.Control>
          {errors && errors.product && (
            <Form.Control.Feedback type='invalid'>{errors.product?.message}</Form.Control.Feedback>
          )}
        </Col>
      </Form.Group>
    </Form.Group>
  );
}
