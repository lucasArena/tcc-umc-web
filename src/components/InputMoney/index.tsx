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
  ...rest
}) => {
  const inputRef = useRef(null);
  const { defaultValue, fieldName, error, registerField } = useField(name);

  const [inputMoney, setInputMoney] = useState(defaultValue || '');
  const handleMask = useCallback((e: React.FormEvent<HTMLInputElement>) => {
    const inputValue = e.currentTarget.value
      .replace(/\D/g, '')
      .replace(/(\d)(\d{2})$/, '$1,$2')
      .replace(/(?=(\d{3})+(\D))\B/g, '.');

    setInputMoney(inputValue);
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      path: 'value',
      ref: inputRef.current,
    });
  }, [registerField, fieldName]);
  return (
    <Container>
      <label>{label}</label>
      <InputContainer error={!!error}>
        {prefix && <span>{prefix}</span>}
        <input
          ref={inputRef}
          onChange={handleMask}
          value={inputMoney}
          {...rest}
        />
      </InputContainer>
    </Container>
  );
};

export default InputMoney;
