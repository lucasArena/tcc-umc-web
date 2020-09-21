import React, { useRef, useEffect } from 'react';
import ReactInputMask, { Props as InputMaskProps } from 'react-input-mask';
import { useField } from '@unform/core';

import { Container, InputContainer } from './styles';

interface InputProps extends InputMaskProps {
  label?: string;
  id?: string;
  name: string;
  icon?: string;
  width?: string;
  iconAction?: () => void;
}

const InputMask: React.FC<InputProps> = ({
  name,
  label,
  id,
  width,
  ...rest
}) => {
  const inputMaskRef = useRef(null);
  const { defaultValue, fieldName, error, registerField } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputMaskRef.current,
      path: 'value',
      setValue(ref: any, value: string) {
        ref.setInputValue(value);
      },
    });
  }, [fieldName, registerField]);

  return (
    <Container width={width}>
      <label htmlFor={id}>{label}</label>
      <InputContainer error={!!error}>
        <ReactInputMask
          ref={inputMaskRef}
          name={name}
          id={id}
          defaultValue={defaultValue}
          {...rest}
        />
      </InputContainer>
    </Container>
  );
};

export default InputMask;
