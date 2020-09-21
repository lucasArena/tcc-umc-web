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
  padding: 0 10px;
`;

export const FormContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 352px;
  width: 100%;
  height: 100vh;
`;

export const FormSignin = styled(Form)`
  margin-top: auto;
  width: 100%;
  h1 {
    text-align: center;
    font-weight: 600;
    font-size: 3.6rem;
    line-height: 3.6rem;
    color: ${(props) => props.theme.colors.textTitle};
    margin-bottom: 4rem;
  }

  @media (min-width: 800px) {
    h1 {
      text-align: left;
    }
  }
`;

export const AuxiliaryActions = styled.main`
  display: flex;
  justify-content: space-between;
  margin: 24px 0;

  div {
    display: flex;
    align-items: center;

    font-family: Poppins;
    font-size: 14px;
    line-height: 24px;

    span {
      margin-left: 5px;
    }

    > a,
    span,
    label {
      color: ${(props) => props.theme.colors.textComplement};
      text-decoration: none;
    }
  }
`;

export const Footer = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: auto 0 4.8rem;
  width: 100%;

  section {
    font-size: 16px;
    line-height: 26px;

    color: ${(props) => props.theme.colors.textBase};

    a {
      color: ${(props) => props.theme.colors.primaryDarker};
      font-weight: bold;
    }
  }

  aside {
    img {
      margin-left: 5px;
    }
  }
`;
