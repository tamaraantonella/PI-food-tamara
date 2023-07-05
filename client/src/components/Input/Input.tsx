import { ReactNode } from 'react';

export interface InputProps {
  containerClassName?: string;
  hasLabel?: boolean;
  labelText?: string;
  labelClassName?: string;
  inputType: string;
  inputName: string;
  inputOnChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  inputValue?: string;
  errors?: ReactNode;
}
export const Input = ({
  containerClassName,
  hasLabel = true,
  labelClassName,
  labelText,
  inputName,
  inputType,
  inputOnChange,
  inputValue, errors
}: InputProps) => {
  return (
    <div className={containerClassName}>
      {hasLabel ? <label className={labelClassName}>{labelText}</label> : null}
      <input
        type={inputType}
        name={inputName}
        value={inputValue}
        onChange={inputOnChange}
      />
      {errors}
    </div>
  );
};
