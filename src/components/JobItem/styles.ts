import styled from 'styled-components';

export const Container = styled.article`
  background: ${(props) => props.theme.colors.boxBase};
  border: ${(props) => props.theme.colors.lineWhite};

  border-radius: 0.8rem;
  margin-top: 2.4rem;
  overflow: hidden;

  header {
    padding: 3.2rem 2rem;
    display: flex;
    align-items: center;

    img {
      width: 8rem;
      height: 8rem;
      border-radius: 50%;
    }

    > div {
      margin-left: 2.4rem;

      span {
        font-size: 1.6rem;
        display: block;
        color: ${(props) => props.theme.colors.textTitle};
        margin-top: 0.4rem;
      }

      strong {
        font: 700 2.4rem Archivo;
        display: block;
        color: ${(props) => props.theme.colors.textTitle};
      }
    }

    @media (min-width: 700px) {
      padding: 3.2rem;
    }
  }

  > p {
    padding: 0 2rem;
    font-size: 1.6rem;
    line-height: 2.8rem;

    @media (min-width: 700px) {
      padding: 0 3.2rem;
    }
  }

  footer {
    padding: 3.2rem 2rem;
    background: ${(props) => props.theme.colors.boxFooter};
    border-top: 1px solid ${(props) => props.theme.colors.lineWhite};
    margin-top: 3.2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;

    p {
      strong {
        color: ${(props) => props.theme.colors.primary};
        font-size: 1.6rem;
        display: block;

        @media (min-width: 700px) {
          display: initial;
          margin-left: 1.6rem;
        }
      }
    }

    button {
      width: 20rem;
      height: 5.6rem;
      background: ${(props) => props.theme.colors.secundary};
      color: ${(props) => props.theme.colors.buttonText};
      border: 0;
      border-radius: 0.8rem;
      cursor: pointer;
      font: 700 1.4rem Archivo;
      display: flex;
      align-items: center;
      justify-content: space-evenly;
      transition: background-color 0.2s;
      text-decoration: none;

      &:hover {
        background-color: ${(props) => props.theme.colors.secundaryDark};
      }

      @media (min-width: 700px) {
        width: 24.6rem;
        font-size: 1.6rem;
        justify-content: center;

        img {
          margin-right: 1.6rem;
        }
      }
    }

    @media (min-width: 700px) {
      padding: 3.2rem;
    }
  }
`;

export const Label = styled.p`
  margin-left: auto;
  background: ${({ theme }) => theme.colors.secundary};
  border-radius: 4px;
  padding: 4px;

  color: ${({ theme }) => theme.colors.buttonText};
  text-transform: uppercase;
  font-weight: bolder;
  font-size: 12px;
`;

export const ClassesList = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 3.2rem;

  @media (min-width: 700px) {
    flex-direction: row;
    padding: 0 2rem;
  }
`;
