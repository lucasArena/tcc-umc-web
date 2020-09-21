import React, {
  InputHTMLAttributes,
  useRef,
  useEffect,
  useState,
  useCallback,
} from 'react';
import { useField } from '@unform/core';

import { Container, CheckboxBlock, Checker } from './styles';

import checkedIcon from '../../assets/images/icons/checked.svg';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  id?: string;
  name: string;
  icon?: string;
  iconAction?: () => void;
}

const Checkbox: React.FC<InputProps> = ({ label, id, name, ...rest }) => {
  const inputRef = useRef(null);
  const [isChecked, setIsChecked] = useState(false);
  const { defaultValue, fieldName, registerField } = useField(name);

  const handleCheck = useCallback(() => {
    setIsChecked(!isChecked);
  }, [setIsChecked, isChecked]);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <Container onClick={handleCheck}>
      <label htmlFor={id}>{label}</label>
      <CheckboxBlock>
        <input
          ref={inputRef}
          defaultValue={defaultValue}
          defaultChecked={isChecked}
          id={id}
          {...rest}
        />
        <Checker checked={isChecked}>
          <img src={checkedIcon} alt="Selecionado para lembrar login" />
        </Checker>
      </CheckboxBlock>
    </Container>
  );
};

export default Checkbox;
