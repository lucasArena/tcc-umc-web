import styled from 'styled-components';

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: auto;

  display: flex;
  flex-direction: column;
  align-items: center;

  color: ${(props) => props.theme.colors.textPrimary};
  background: ${(props) => props.theme.colors.background};
`;
