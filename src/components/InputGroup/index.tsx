import React from 'react';

import { Container } from './styles';

interface InputGroupProps {
  additionalStyles?: object;
}

const InputGroup: React.FC<InputGroupProps> = ({
  children,
  additionalStyles,
}) => {
  return <Container style={additionalStyles}>{children}</Container>;
};

export default InputGroup;
