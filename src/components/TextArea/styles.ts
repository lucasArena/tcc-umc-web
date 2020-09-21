import styled, { css } from 'styled-components';

interface ContainerTextAreaProps {
  error: boolean;
}

export const Container = styled.div`
  position: relative;
  label {
    color: ${(props) => props.theme.colors.textPrimary};
  }

  & + div {
    margin-top: 1.4rem;

    @media (min-width: 700px) {
      margin-top: 0;
    }
  }
`;

export const ContainerTextArea = styled.div<ContainerTextAreaProps>`
  background: ${(props) => props.theme.colors.inputBackground};
  border: 1px solid ${(props) => props.theme.colors.lineWhite};
  border-radius: 0.8rem;
  padding: 1.2rem 1.6rem;

  textarea {
    width: 100%;
    height: 16rem;
    margin-top: 0.8rem;
    outline: 0;
    resize: vertical;
    font: 1.6rem Archivo;
    min-height: 8rem;
    border: 0;
    background: ${(props) => props.theme.colors.inputBackground};
  }

  ${(props) =>
    props.error &&
    css`
      border: 1px solid ${props.theme.colors.deleteButtonText};
    `}

  &:focus-within::after {
    width: calc(100% - 3.2rem);
    height: 2px;
    content: '';
    background: ${(props) => props.theme.colors.primaryLight};
    left: 1.6rem;
    right: 1.6rem;
    position: absolute;
    bottom: 6px;
  }
`;
