import React, { InputHTMLAttributes, useRef, useEffect } from 'react';
import { useField } from '@unform/core';

import { Container, InputContainer } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  id?: string;
  name: string;
  icon?: string;
  width?: string;
  iconAction?: () => void;
}

const Input: React.FC<InputProps> = ({
  label,
  id,
  name,
  icon,
  width,
  iconAction,
  ...rest
}) => {
  const inputRef = useRef(null);
  const { defaultValue, fieldName, error, registerField } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <Container width={width}>
      <label htmlFor={id}>{label}</label>
      <InputContainer error={!!error}>
        <input
          ref={inputRef}
          defaultValue={defaultValue}
          name={name}
          id={id}
          {...rest}
        />
        {icon && (
          <button type="button" onClick={iconAction}>
            <img src={icon} alt="Icone" />
          </button>
        )}
      </InputContainer>
    </Container>
  );
};

export default Input;
