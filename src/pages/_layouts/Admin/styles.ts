import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100vh;

  display: flex;

  color: ${(props) => props.theme.colors.textPrimary};
  background: ${(props) => props.theme.colors.primary};
`;
