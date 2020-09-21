import styled, { css } from 'styled-components';
import { Link, LinkProps } from 'react-router-dom';

interface ChooseTypeProps extends LinkProps {
  classtype: string;
}

export const Container = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: center;

  color: ${(props) => props.theme.colors.textPrimary};
  background: ${(props) => props.theme.colors.primary};
`;

export const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  max-width: 700px;
  width: 90vw;

  @media (min-width: 1100px) {
    max-width: 1100px;
    padding: 3rem 0;
  }
`;

export const ProfileArea = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: ${(props) => props.theme.colors.boxBase};
  transition: color 0.2s;

  &:hover {
    color: rgba(255, 255, 255, 0.8);
  }

  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 1rem;
  }
`;

export const Logout = styled(Link)`
  background: ${(props) => props.theme.colors.primaryDarker};
  padding: 0.8rem;
  border-radius: 0.8rem;

  @media (min-width: 1100px) {
    padding: 1.2rem;
  }
`;

export const Content = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;

  width: 90vw;
  max-width: 700px;

  @media (min-width: 1100px) {
    max-width: 1100px;
    flex-direction: row;
    flex: 1;
  }
`;

export const LogoContainer = styled.div`
  text-align: center;
  margin-bottom: 3.2rem;

  h1 {
    font-weight: 500;
    font-size: 2rem;
    line-height: 4.6rem;
    margin-top: 0.8rem;
  }

  img {
    height: 6rem;
  }

  @media (min-width: 1100px) {
    grid-area: logo;
    align-self: center;
    margin: 0;
    text-align: left;

    h1 {
      text-align: initial;
      font-size: 3.6rem;
    }

    img {
      height: 100%;
    }
  }
`;

export const HeroImage = styled.img`
  width: 100%;

  @media (min-width: 1100px) {
    grid-area: hero;
    align-self: center;
    justify-self: end;
  }
`;

export const Footer = styled.footer`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
  height: 40%;
  width: 100vw;

  section {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
  }

  @media (min-width: 1100px) {
    background: ${(props) => props.theme.colors.background};

    section {
      max-width: 1100px;

      display: grid;
      grid-template-rows: 1fr;
      grid-template-columns: 1fr 1fr 1fr 1fr;

      grid-template-areas: 'welcome total buttons buttons';
    }
  }
`;

export const WelcomeMessage = styled.div`
  font-family: Poppins;
  font-size: 2rem;
  line-height: 3rem;
  color: ${(props) => props.theme.colors.textPrimary};

  @media (min-width: 1100px) {
    grid-area: welcome;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    color: ${(props) => props.theme.colors.textBase};
  }
`;

export const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 3.2rem 0;

  @media (min-width: 1100px) {
    grid-area: buttons;

    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
  }
`;

export const ButtonTypeChoose = styled(Link) <ChooseTypeProps>`
  width: 30rem;
  height: 10.4rem;
  border-radius: 0.8rem;
  font: 700 2rem Archivo;

  display: flex;
  align-items: center;
  justify-content: center;

  text-decoration: none;
  color: ${(props) => props.theme.colors.buttonText};
  transition: background-color 0.2s;

  ${(props) =>
    props.classtype === 'study' &&
    css`
      background: ${props.theme.colors.primaryLighter};

      &:hover {
        background: ${props.theme.colors.primaryLight};
      }
    `}

  ${(props) =>
    props.classtype === 'giveClasses' &&
    css`
      background: ${props.theme.colors.secundary};

      &:hover {
        background: ${props.theme.colors.secundaryDark};
      }
    `}

  img {
    width: 4rem;
  }

  & + a {
    margin-top: 1.6rem;
  }

  @media (min-width: 1100px) {
    img {
      margin-right: 2.4rem;
    }

    & + a {
      margin-top: 0;
      margin-left: 1.6rem;
    }
  }
`;

export const TotalConnections = styled.div`
  font-size: 1.2rem;

  display: flex;
  align-items: center;
  justify-content: center;
  text-align: right;

  img {
    margin-left: 0.8rem;
  }

  @media (min-width: 1100px) {
    grid-area: total;
    display: block;
    color: ${(props) => props.theme.colors.textComplement};

    justify-self: center;
  }
`;
