import styled from 'styled-components';
import { lighten } from 'polished';
import { Form as UnformForm } from '@unform/web';

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: ${(props) => props.theme.colors.background};

  > div {
    header {
      section {
        margin-bottom: 6.4rem;
      }
    }
  }

  @media (min-width: 700px) {
    > div {
      header {
        section {
          margin-bottom: 0;
        }
      }
    }
  }
`;

export const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;

  h2 {
    font-family: Archivo;
    font-weight: bold;
    font-size: 36px;
    line-height: 2.5rem;
    text-align: center;
    color: ${(props) => props.theme.colors.boxBase};
    margin-top: 32px;
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
  overflow: hidden;

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

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-width: 700px) {
    flex-direction: row;

    > section {
      & + section {
        margin-left: 3.2rem;
      }
    }
  }
`;

export const ScheduleArea = styled.div`
  @media (min-width: 700px) {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr;
    column-gap: 1.6rem;
  }
`;

export const DeleteScheduleArea = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1.6rem;

  hr {
    border: 1px solid ${(props) => props.theme.colors.lineWhite};
    flex: 1;
  }

  button {
    font-family: Archivo;
    font-weight: 600;
    font-size: 1.4rem;
    line-height: 2.4rem;
    background: transparent;
    border: 0;
    outline: 0;
    padding: 0 2.4rem;
    cursor: pointer;
    color: ${(props) => props.theme.colors.deleteButtonText};
    transition: 0.4s;

    &:hover {
      color: ${(props) => lighten(0.08, props.theme.colors.deleteButtonText)};
    }
  }
`;
