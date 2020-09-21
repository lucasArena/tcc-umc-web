import styled, { css } from 'styled-components';

interface ContainerProps {
  width?: string;
}

interface InputContainerProps {
  error: boolean;
}

export const Container = styled.section<ContainerProps>`
  display: flex;
  flex-direction: column;
  width: 100%;

  label {
    font-size: 1.4rem;
    color: ${(props) => props.theme.colors.textPrimary};
  }

  @media (min-width: 700px) {
    width: ${(props) => (props.width ? props.width : '100%')};
  }
`;

export const InputContainer = styled.div<InputContainerProps>`
  display: flex;

  position: relative;
  background: ${(props) => props.theme.colors.boxFooter};
  border: 1px solid ${(props) => props.theme.colors.lineWhite};
  padding: 0 1.6rem;
  margin-top: 0.8rem;
  border-radius: 8px;

  ${(props) =>
    props.error &&
    css`
      border: 1px solid ${props.theme.colors.deleteButtonText};
    `}

  input {
    width: 100%;
    height: 5.6rem;
    border-radius: 0.8rem;
    background: ${(props) => props.theme.colors.boxFooter};

    border: 0;
    outline: 0;
    font: 1.6rem Archivo;

    &::placeholder {
      font-size: 16px;
      line-height: 24px;
      color: ${(props) => props.theme.colors.textComplement};
    }
  }

  button {
    background: transparent;
    border: 0;
    outline: 0;
    cursor: pointer;
  }

  &:focus-within::after {
    width: calc(100% - 3.2rem);
    height: 2px;
    content: '';
    background: ${(props) => props.theme.colors.primaryLight};
    left: 1.6rem;
    right: 1.6rem;
    bottom: 0;
    position: absolute;
  }
`;
