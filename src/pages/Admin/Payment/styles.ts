import styled from 'styled-components';
import Button from '../../../components/Button';

export const Container = styled.div`
  width: 85%;
  background: ${(props) => props.theme.colors.background};
  padding: 10px 30px;
`;

export const Top = styled.section`
  display: flex;
  justify-content: space-between;

  a {
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
    background: ${(props) => props.theme.colors.secundary};
    cursor: pointer;
    transition: background 0.4s;

    &:hover {
      background: ${(props) => props.theme.colors.secundaryDark};
    }
  }
`;

export const TitleSection = styled.section`
  margin-top: 60px;

  h2 {
    color: ${(props) => props.theme.colors.primary};
  }
`;

export const Main = styled.main`
  display: flex;
  flex-direction: column;
`;

export const Item = styled.div`
  background: ${(props) => props.theme.colors.boxBase};
  border: ${(props) => props.theme.colors.lineWhite};

  border-radius: 0.8rem;
  margin-top: 2.4rem;
  overflow: hidden;

  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;

  text-decoration: none;
  transition: transform 0.4s;

  &:hover {
    transform: scale(1.02);
  }

  main {
    display: flex;
    align-items: center;

    img {
      width: 86px;
      height: 86px;
      border-radius: 50%;
      margin-right: 10px;
      background: ${(props) => props.theme.colors.textComplement};
    }

    h3 {
      color: ${(props) => props.theme.colors.primaryLight};
    }

    strong {
      color: ${(props) => props.theme.colors.primary};
    }
  }

  aside {
  }

  & + a {
    margin-top: 10px;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;

  div + div {
    margin-left: 10px;
  }
`;

export const ConfirmPaymentButton = styled(Button)``;

export const NoResults = styled.section`
  display: flex;
  align-items: center;

  margin-top: 40px;

  h2 {
    font-size: 3rem;
    color: ${(props) => props.theme.colors.primary};
    min-width: 200px;
  }

  img {
    width: 700px;

    margin-top: 20px;
  }
`;
