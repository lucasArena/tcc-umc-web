import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;

  @media (min-width: 700px) {
    flex-direction: row;

    > section {
      & + section {
        margin-left: 3.2rem;
      }
    }
  }
`;
