import styled from 'styled-components';

import backgroundThings from '../../assets/images/background-things.svg';

export const Container = styled.main`
  width: 100vw;
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.colors.primary};
  background-image: url(${backgroundThings});
  background-size: center;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    margin-bottom: 5.5rem;
  }

  h1 {
    font-family: Archivo;
    font-weight: bold;
    font-size: 5.4rem;
    line-height: 4.2rem;
    text-align: center;
    color: ${(props) => props.theme.colors.boxBase};
    margin-bottom: 2.4rem;
  }

  h3 {
    font-family: Poppins;
    font-weight: normal;
    font-size: 1.6rem;
    line-height: 2.6rem;
    color: ${(props) => props.theme.colors.textPrimary};
  }

  a {
    margin-top: 8rem;
    text-align: center;
    background: ${(props) => props.theme.colors.secundary};
    border-radius: 8px;
    padding: 1.5rem 0;
    max-width: 200px;
    width: 100%;

    font-family: Archivo;
    text-decoration: none;
    font-weight: 600;
    font-size: 1.6rem;
    line-height: 2.6rem;
    color: ${(props) => props.theme.colors.boxBase};
  }
`;
