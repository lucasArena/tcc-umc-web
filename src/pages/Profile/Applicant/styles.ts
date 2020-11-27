import styled from 'styled-components';
import { Form as UnformForm } from '@unform/web';

import backgroundThings from '../../../assets/images/background-things.svg';

export const ProfileInfo = styled.div`
  display: flex;
  width: 100%;
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

export const AvatarContainer = styled.label`
  position: relative;
  cursor: pointer;

  img {
    width: 18rem;
    height: 18rem;
    border-radius: 50%;
  }

  input {
    display: none;
  }

  div {
    position: absolute;
    right: 0px;
    width: 48px;
    height: 48px;
    bottom: 0;
    border: 0;
    padding: 2px;
    background: ${(props) => props.theme.colors.secundary};
    border-radius: 50%;

    display: flex;
    justify-content: center;
    align-items: center;
    transition: background 0.2s;

    &:hover {
      background: ${(props) => props.theme.colors.secundaryDark};
    }

    svg {
      width: 18px;
      height: 18px;
      color: ${(props) => props.theme.colors.boxBase};
    }
  }
`;

export const Form = styled(UnformForm)`
  background: ${(props) => props.theme.colors.boxBase};
  width: 100%;
  max-width: 74rem;
  border-radius: 0.8rem;
  margin: -3.2rem auto 3.2rem;
  padding-top: 6.4rem;

  > fieldset {
    border: 0;
    padding: 0 2.4rem;

    legend {
      font: 700 2.4rem Archivo;
      color: ${(props) => props.theme.colors.textTitle};
      display: flex;
      margin-bottom: 2.4rem;
      justify-content: space-between;
      width: 100%;
      padding-bottom: 1.6rem;
      border-bottom: 1px solid ${(props) => props.theme.colors.lineWhite};

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

  footer {
    padding: 4rem 2.4rem;
    background: ${(props) => props.theme.colors.boxFooter};
    border-top: 1px solid ${(props) => props.theme.colors.lineWhite};
    margin-top: 6.4rem;

    p {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.4rem;
      line-height: 2.4rem;
      color: ${(props) => props.theme.colors.textComplement};

      img {
        margin-right: 2rem;
      }
    }

    button {
      width: 100%;
      height: 5.6rem;
      background: ${(props) => props.theme.colors.secundary};
      color: ${(props) => props.theme.colors.buttonText};
      border: 0;
      border-radius: 0.8rem;
      cursor: pointer;
      font: 700 1.6rem Archivo;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background-color 0.2s;
      margin-top: 3.2rem;

      &:hover {
        background: ${(props) => props.theme.colors.secundaryDark};
      }
    }

    @media (min-width: 700px) {
      max-width: 100vw;
      padding: 4rem 6.4rem;
      display: flex;
      align-items: center;
      justify-content: space-between;

      p {
        justify-content: space-between;
      }

      button {
        width: 20rem;
        margin-top: 0;
      }
    }
  }
`;

export const UploadResumeContainer = styled.section`
  label {
    cursor: pointer;
    position: relative;
    display: flex;
    align-items: center;

    flex: 1;
    border: 0;
    border-radius: 8px;
    padding: 16px;
    outline: 0;

    font-weight: 600;
    font-size: 16px;
    line-height: 26px;
    background: ${(props) => props.theme.colors.secundary};
    transition: background 0.4s;

    span {
      margin-right: 10px;
      color: ${(props) => props.theme.colors.boxBase};
    }

    svg {
      color: ${(props) => props.theme.colors.boxBase};
    }

    &:hover {
      background: ${(props) => props.theme.colors.secundaryDark};
    }

    input {
      display: none;
    }
  }
`;
