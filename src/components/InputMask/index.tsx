import React, { useRef, useEffect, useCallback, useState } from 'react';
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

  const [mask, setMask] = useState(defaultValue || '');

  const handleMask = useCallback((e) => {
    const { value } = e.target;
    return setMask(value);
  }, []);

  useEffect(() => {
    setMask(defaultValue || '');
  }, [defaultValue]);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputMaskRef.current,
      path: 'value',
      clearValue: (pickerRef) => {
        pickerRef.setInputValue(null);
      },
    });
  }, [registerField, fieldName]);

  return (
    <Container width={width}>
      <label htmlFor={id}>{label}</label>
      <InputContainer error={!!error}>
        <ReactInputMask
          ref={inputMaskRef}
          name={name}
          id={id}
          value={mask}
          onChange={(e) => handleMask(e)}
          {...rest}
        />
      </InputContainer>
    </Container>
  );
};

export default InputMask;
