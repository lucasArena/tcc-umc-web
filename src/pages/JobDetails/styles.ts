import styled from 'styled-components';
import { Form } from '@unform/web';

import backgroundThings from '../../assets/images/background-things.svg';

export const Container = styled.main`
  width: 100vw;
`;

export const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
  background: ${(props) => props.theme.colors.primary};
  background-image: url('${backgroundThings}');

  padding: 4rem 0;
  background-image: h2 {
    font-family: Archivo;
    font-weight: bold;
    font-size: 36px;
    line-height: 2.5rem;
    text-align: center;
    color: ${(props) => props.theme.colors.boxBase};
    margin-top: 32px;
  }

  h2 {
    color: ${(props) => props.theme.colors.lineWhite};
  }

  span {
    margin-top: 16px;
    font-family: Poppins;
    font-size: 20px;
    line-height: 26px;
    color: ${(props) => props.theme.colors.textPrimary};
  }
`;

export const AvatarContainer = styled.div`
  position: relative;
  cursor: pointer;

  img {
    width: 18rem;
    height: 18rem;
    border-radius: 50%;
  }
`;

export const FormJobDetails = styled.main`
  background: ${(props) => props.theme.colors.boxBase};
  width: 100%;
  max-width: 74rem;
  border-radius: 0.8rem;
  margin: -3.2rem auto 3.2rem;
  padding-top: 6.4rem;
  overflow: hidden;

  > fieldset {
    border: 0;
    padding: 0 2.4rem;
    border-bottom: 1px solid ${(props) => props.theme.colors.lineWhite};
    padding-bottom: 1.6rem;
    margin-bottom: 1rem;

    legend {
      font: 700 2.4rem Archivo;
      color: ${(props) => props.theme.colors.textTitle};
      display: flex;
      margin-bottom: 1rem;
      justify-content: space-between;
      width: 100%;

      button {
        background: none;
        border: 0;
        color: ${(props) => props.theme.colors.primary};
        font: 700 1.6rem Archivo;
        cursor: pointer;
        transition: color 0.2s;

        &:hover {
          color: ${(props) => props.theme.colors.primaryDark};
        }
      }
    }

    span {
      font: 700 1.5rem Archivo;
    }

    > div + div {
      margin-top: 2.4rem;
    }

    label {
      color: ${(props) => props.theme.colors.textComplement};
    }

    & + fieldset {
      margin-top: 6.4rem;
    }

    @media (min-width: 700px) {
      padding: 0 6.4rem;
    }
  }
`;

export const Content = styled.section`
  display: flex;
  padding: 0 6.4rem;
`;

export const Main = styled.main`
  text-align: justify;
  font-family: Poppins;
  width: 70%;
  padding-right: 3rem;

  div {
    margin-top: 1.5rem;
    border-top: 1px solid ${(props) => props.theme.colors.lineWhite};
    section {
      margin-top: 1rem;
    }
  }
`;

export const Aside = styled.aside`
  width: 30%;
`;
