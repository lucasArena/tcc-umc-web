import styled from 'styled-components';
import { Form } from '@unform/web';

export const Container = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;

  color: ${(props) => props.theme.colors.textPrimary};
`;

export const LogoContainer = styled.div`
  align-self: center;
  margin: 0;
  text-align: left;
  width: 60%;

  h1 {
    font-weight: 500;
    text-align: initial;
    font-size: 2.6rem;
    line-height: 4.6rem;
    margin-top: 0.8rem;
    width: 70%;
  }

  img {
    width: 100%;
    height: 100%;
  }
`;

export const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const TobBar = styled.header`
  max-width: 352px;
  width: 100%;
  padding-top: 3.2rem;

  a {
    &:hover {
      opacity: 0.6;
    }
  }
`;

export const FormContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 352px;
  width: 100%;
  height: 100vh;
`;

export const FormSignup = styled(Form)`
  width: 100%;

  section {
    margin-bottom: 4rem;

    h1 {
      text-align: center;
      font-weight: 600;
      font-size: 3.6rem;
      line-height: 3.6rem;
      color: ${(props) => props.theme.colors.textTitle};
    }

    h2 {
      font-family: Poppins;
      font-size: 1.6rem;
      line-height: 2.6rem;
      color: #6a6180;
    }
  }

  @media (min-width: 800px) {
    section {
      margin-bottom: 0;
      h1 {
        text-align: left;
        margin-bottom: 2.1rem;
      }
    }
  }
`;

export const ButtonContainer = styled.div`
  margin-top: 4rem;
`;
