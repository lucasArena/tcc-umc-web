import { Link } from 'react-router-dom';
import styled from 'styled-components';
// import Button from '../../components/Button';

export const Container = styled.div`
  height: 100%;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column-reverse;
  justify-content: center;

  height: 100%;

  @media (min-width: 768px) {
    flex-direction: row;

    justify-content: center;
    align-items: center;
  }
`;

export const ImageBlockContainer = styled.div`
  display: flex;
  flex-direction: column-reverse;

  img {
    width: 100%;
  }

  @media (min-width: 768px) {
    display: flex;
    align-items: center;

    img {
      width: 80%;
    }
  }
`;

export const Main = styled.main`
  margin: 0 25px;
`;

export const Title = styled.div`
  font-size: 1rem;

  display: flex;
  flex-direction: column;

  text-align: center;

  h1 {
    color: ${({ theme }) => theme.colors.primaryDarker};
  }

  h2 {
    color: ${({ theme }) => theme.colors.primaryLight};
  }

  @media (min-width: 768px) {
    font-size: 1.8rem;
  }
`;

export const ButtonGoBackToLanding = styled(Link)`
  margin: 20px 0;

  display: block;

  min-width: 200px;
  border: 0;
  border-radius: 8px;
  padding: 16px 0;
  outline: 0;

  font-weight: 600;
  font-size: 16px;
  text-align: center;
  text-decoration: none;
  line-height: 26px;
  color: ${(props) => props.theme.colors.boxBase};
  background: ${(props) => props.theme.colors.primaryLight};
  cursor: pointer;
  transition: background 0.4s;

  &:hover {
    background: ${(props) => props.theme.colors.primaryDarker};
  }
`;
