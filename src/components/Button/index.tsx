import React, { ButtonHTMLAttributes } from 'react';

import { Container } from './styles';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  disabled?: boolean;
  containerStyles?: React.CSSProperties;
}

const Button: React.FC<ButtonProps> = ({
  children,
  disabled,
  style,
  ...rest
}) => {
  return (
    <Container disabled={disabled}>
      <button type="submit" {...rest} disabled={disabled} style={style}>
        {children}
      </button>
    </Container>
  );
};

export default Button;
