import styled, { css } from 'styled-components';

interface CheckerProps {
  checked: boolean;
}

export const Container = styled.div`
  cursor: pointer;

  label {
    color: ${(props) => props.theme.colors.textComplement};
  }
`;

export const CheckboxBlock = styled.div`
  display: flex;

  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }
`;

export const Checker = styled.span<CheckerProps>`
  height: 2.4rem;
  width: 2.4rem;
  background: ${(props) => props.theme.colors.boxFooter};
  border: 1px solid ${(props) => props.theme.colors.lineWhite};
  box-sizing: border-box;
  border-radius: 8px;
  margin-right: 0.6rem;

  display: flex;
  justify-content: center;

  ${(props) =>
    props.checked &&
    css`
      background: ${props.theme.colors.secundary};
    `}
`;
