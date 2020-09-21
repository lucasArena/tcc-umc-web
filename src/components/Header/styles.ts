import styled from 'styled-components';

export const Container = styled.div`
  max-width: 100vw;
`;

export const PageHeader = styled.header`
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.colors.primary};
  height: 100%;

  @media (min-width: 700px) {
    min-height: 200px;
  }
`;

export const TopbarContainer = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: ${(props) => props.theme.colors.textPrimary};
  background: ${(props) => props.theme.colors.primaryDarker};

  padding: 1.6rem 0;

  button {
    height: 3.2rem;
    transition: opacity 0.2s;
    background: transparent;
    border: 0;
    outline: 0;
    cursor: pointer;

    &:hover {
      opacity: 0.6;
    }
  }

  h1 {
    font-family: Archivo;
    font-weight: 500;
    font-size: 1.6rem;
    line-height: 1.7rem;
    color: ${(props) => props.theme.colors.textPrimary};
  }

  > a {
    display: flex;
    align-items: center;

    > img {
      height: 1.6rem;
    }
  }

  @media (min-width: 700px) {
  }
`;

export const HeaderContent = styled.section`
  width: 90%;
  margin: 0 auto;
  position: relative;
  margin: 3.2rem auto;

  > strong {
    font-family: Archivo;
    font-weight: bold;
    font: 700 2.6rem Archivo;
    line-height: 4.2rem;
    color: ${(props) => props.theme.colors.titlePrimary};
  }

  > p {
    max-width: 30rem;
    font-size: 1.6rem;
    line-height: 2.6rem;
    color: ${(props) => props.theme.colors.textPrimary};
    margin-top: 2.4rem;
  }

  @media (min-width: 700px) {
    flex: 1;
    max-width: 740px;
    margin: 0 auto;
    padding-bottom: 48px;
    display: flex;
    flex-direction: column;

    strong {
      font-size: 3.6rem;
      line-height: 4.2rem;
    }
  }
`;
