import React, { ButtonHTMLAttributes } from 'react';

import { Container } from './styles';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  disabled: boolean;
}

const Button: React.FC<ButtonProps> = ({ children, disabled, ...rest }) => {
  return (
    <Container disabled={disabled}>
      <button type="submit" {...rest} disabled={disabled}>
        {children}
      </button>
    </Container>
  );
};

export default Button;
