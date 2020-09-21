import React, { TextareaHTMLAttributes, useEffect, useRef } from 'react';
import { useField } from '@unform/core';

import { Container, ContainerTextArea } from './styles';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  id: string;
  name: string;
}

const Textarea: React.FC<TextareaProps> = ({ label, id, name, ...rest }) => {
  const textareaRef = useRef(null);
  const { defaultValue, fieldName, error, registerField } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: textareaRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <Container>
      <label htmlFor={id}>
        {label}
        <ContainerTextArea error={!!error}>
          <textarea
            ref={textareaRef}
            defaultValue={defaultValue}
            id={id}
            {...rest}
          />
        </ContainerTextArea>
      </label>
    </Container>
  );
};

export default Textarea;
