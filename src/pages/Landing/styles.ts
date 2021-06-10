import styled from 'styled-components';
import Button from '../../components/Button';

export const Content = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;

  background: ${(props) => props.theme.colors.background};
  margin: 1rem auto;

  @media (min-width: 1100px) {
    flex: 1;
  }
`;

export const AdvertiseContainer = styled.aside`
  display: flex;
  justify-content: center;
  width: 100%;
`;

export const ButtonBePremiumUser = styled(Button)`
  min-width: 400px;
`;

export const JobList = styled.main`
  margin: 1rem auto;
  width: 90%;
  height: 60%;

  @media (min-width: 700px) {
    max-width: 740px;
    margin: 0 auto;
  }
`;

export const NoResult = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;

  margin-top: 40px;

  img {
    width: 700px;
  }

  h2 {
    font-size: 3rem;
    color: ${(props) => props.theme.colors.primary};
  }
`;
