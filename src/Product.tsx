import { InputProps } from './InputProps';

export interface IProductProps extends InputProps {
  defaultValue: any;
}

export default function Product({ register, errors, defaultValue }: IProductProps) {
  return (
    <div>
      <input type='text' name={`product`} ref={register}></input>
      {errors && errors.list && errors.product && (
        <span style={{ backgroundColor: 'red', color: 'white' }}>{errors.product.message}</span>
      )}
    </div>
  );
}
