import styled from 'styled-components';
import { Form as UnformForm } from '@unform/web';

export const Container = styled.div`
  width: 100vw;
  max-width: 700px;

  @media (min-width: 700px) {
    max-width: 100%;
  }
`;

export const HeaderContent = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;

  strong {
    font-family: Archivo;
    color: ${(props) => props.theme.colors.boxBase};
    line-height: 4.2rem;
    text-align: center;
    font-size: 2.4rem;
  }

  p {
    font-family: Poppins;
    line-height: 2.6rem;
    color: ${(props) => props.theme.colors.textPrimary};
    font-size: 1.6rem;
    text-align: center;
  }

  aside {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 1.4rem;

    font-family: Poppins;
    font-size: 1.2rem;
    line-height: 2rem;
    color: ${(props) => props.theme.colors.textPrimary};

    img {
      margin-right: 1.6rem;
    }
  }

  @media (min-width: 700px) {
    flex-direction: row;
    justify-content: space-between;

    strong {
      grid-area: title;
      display: flex;
      align-items: center;
      font-size: 3.6rem;
      text-align: left;
      max-width: 340px;
    }

    aside {
      grid-area: iconarea;
      display: flex;
      align-items: center;
    }
  }
`;

export const Form = styled(UnformForm)`
  margin-top: 3.2rem;

  > div {
    position: relative;
    label {
      color: ${(props) => props.theme.colors.textPrimary};

      input {
        width: 100%;
        height: 5.6rem;
        margin-top: 0.8rem;
        border-radius: 0.8rem;
        background: ${(props) => props.theme.colors.inputBackground};
        border: 1px solid ${(props) => props.theme.colors.lineWhite};
        outline: 0;
        padding: 0 1.6rem;
        font: 1.6rem Archivo;
      }
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
    outline: 0;
    border: 0;

    &:hover {
      background: ${(props) => props.theme.colors.secundaryDark};
    }
  }

  @media (min-width: 700px) {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    column-gap: 16px;
    position: absolute;
    bottom: -30px;
  }
`;

export const ListTeacher = styled.main`
  margin: 3.2rem auto;
  width: 90%;
  height: 60%;

  @media (min-width: 700px) {
    padding: 3.2rem 0;
    max-width: 740px;
    margin: 0 auto;
  }
`;

export const NoResult = styled.section`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;

  span {
    font-family: Poppins;
    font-size: 1.6rem;
    line-height: 2.6rem;
    max-width: 25rem;
    text-align: center;

    color: ${(props) => props.theme.colors.textComplement};
  }
`;
