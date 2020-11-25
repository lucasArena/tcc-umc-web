import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { darken } from 'polished';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem 0;
  width: 100%;
  background: ${(props) => props.theme.colors.primaryDark};

  menu {
    display: flex;
    justify-content: space-between;
    width: 100%;
    max-width: 700px;
  }

  @media (min-width: 1100px) {
    menu {
      max-width: 1100px;
    }
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

export const Right = styled.section`
  display: flex;

  a {
    cursor: pointer;
    text-decoration: none;
    margin-right: 2rem;
    border: 0;
    border-radius: 1rem;
    padding: 1rem 1.5rem;
    font-size: 1.5rem;
    background: ${(props) => props.theme.colors.primaryDarker};
    color: ${(props) => props.theme.colors.buttonText};
    transition: background 0.4s;

    &:hover {
      background: ${(props) => darken(0.04, props.theme.colors.primaryDarker)};
    }
  }
`;

export const Logout = styled(Link)`
  background: ${(props) => props.theme.colors.primaryDarker};
  padding: 0.8rem;
  border-radius: 0.8rem;

  svg {
    display: flex;
  }

  @media (min-width: 1100px) {
    padding: 1.2rem;
  }
`;
