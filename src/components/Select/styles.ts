import styled from 'styled-components';

interface ContainerProps {
  width?: string;
}

export const Container = styled.section<ContainerProps>`
  position: relative;
  color: ${(props) => props.theme.colors.textPrimary};
  width: ${(props) => (props.width ? props.width : '100%')};

  label {
    font-size: 1.4rem;
  }

  select {
    width: 100%;
    height: 5.6rem;
    margin-top: 0.8rem;
    border-radius: 0.8rem;
    background: ${(props) => props.theme.colors.inputBackground};
    border: 1px solid ${(props) => props.theme.colors.lineWhite};
    outline: 0;
    padding: 0 1.6rem;
    font: 1.4rem Archivo;
  }

  & + div {
    margin-top: 1.4rem;

    @media (min-width: 700px) {
      margin-top: 0;
    }
  }

  .css-1okebmr-indicatorSeparator {
    display: none;
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
