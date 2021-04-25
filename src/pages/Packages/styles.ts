import styled from 'styled-components';
import Button from '../../components/Button';

export const Content = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;

  padding: 0 10%;
`;

export const Title = styled.h1`
  text-align: center;
  color: ${({ theme }) => theme.colors.primaryLight};
`;

export const Description = styled.h2`
  text-align: center;
  color: ${({ theme }) => theme.colors.primaryLighter};
`;

export const PackageList = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-column-gap: 1%;
  grid-row-gap: 3%;

  margin-top: 4%;
`;

export const PackageContainer = styled.section`
  background: ${({ theme }) => theme.colors.boxBase};
  border-radius: 4px;
  padding: 20px;
  height: 250px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  h2 {
    color: ${({ theme }) => theme.colors.textTitle};
  }

  div {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    align-items: center;

    span {
      font-weight: bolder;
      font-size: 2.4rem;
      color: ${({ theme }) => theme.colors.primary};
    }
  }
`;

export const PackageButton = styled(Button)`
  min-width: 200px;
  margin-top: auto;
`;
