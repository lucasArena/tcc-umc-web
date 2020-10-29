import styled from 'styled-components';

interface ContainerProps {
  width?: string;
}

export const Container = styled.section<ContainerProps>`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: auto;

  label {
    font-size: 1.4rem;
    color: ${(props) => props.theme.colors.textPrimary};
  }

  @media (min-width: 700px) {
    width: ${(props) => (props.width ? props.width : '100%')};
  }
`;

export const UploadContainer = styled.label`
  position: relative;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid ${(props) => props.theme.colors.background};
  border-radius: 2rem;
  padding: 0 2rem;
  transition: background 0.5s;

  &:hover {
    background: ${(props) => props.theme.colors.boxFooter};
  }

  img {
    width: 3.5rem;
    height: 3.5rem;
    border-radius: 50%;
  }

  span {
    text-align: center;
    margin-top: 1rem;
  }

  input {
    display: none;
  }
`;
