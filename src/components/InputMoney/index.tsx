import React, {
  InputHTMLAttributes,
  useCallback,
  useState,
  useEffect,
  useRef,
} from 'react';
import { useField } from '@unform/core';

import { Container, InputContainer } from './styles';

interface InputMoneyProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  prefix?: string;
}

const InputMoney: React.FC<InputMoneyProps> = ({
  prefix,
  name,
  label,
  width,
  ...rest
}) => {
  const inputRef = useRef(null);
  const { defaultValue, fieldName, error, registerField } = useField(name);

  const [inputMoney, setInputMoney] = useState(defaultValue || '');
  const handleMask = useCallback((value: string) => {
    if (!value) {
      setInputMoney('');
      return 0.0;
    }

    const inputValue = String(value)
      .replace(/\D/g, '')
      .replace(/(\d)(\d{2})$/, '$1,$2')
      .replace(/(?=(\d{3})+(\D))\B/g, '.');

    setInputMoney(inputValue);
    return inputValue;
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      path: 'value',
      ref: inputRef.current,
    });

    handleMask(defaultValue);
  }, [registerField, fieldName, handleMask, defaultValue]);

  return (
    <Container style={{ width }}>
      <label>{label}</label>
      <InputContainer error={!!error}>
        {prefix && <span>{prefix}</span>}
        <input
          {...rest}
          ref={inputRef}
          onChange={(e) => handleMask(e.target.value)}
          value={inputMoney}
        />
      </InputContainer>
    </Container>
  );
};

export default InputMoney;
