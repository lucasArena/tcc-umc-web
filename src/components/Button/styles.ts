import styled, { css } from 'styled-components';

interface ButtonProps {
  disabled: boolean;
}

export const Container = styled.div<ButtonProps>`
  display: flex;

  button {
    flex: 1;
    border: 0;
    border-radius: 8px;
    padding: 16px 0;
    outline: 0;

    font-weight: 600;
    font-size: 16px;
    line-height: 26px;
    color: ${(props) => props.theme.colors.boxBase};
    background: ${(props) => props.theme.colors.secundary};
    cursor: pointer;
    transition: background 0.4s;

    &:hover {
      background: ${(props) =>
    !props.disabled && props.theme.colors.secundaryDark};
    }

    ${(props) =>
    props.disabled &&
    css`
        background: ${props.theme.colors.buttonDisabled};
        color: ${props.theme.colors.textComplement};
        cursor: not-allowed;
      `}
  }
`;
