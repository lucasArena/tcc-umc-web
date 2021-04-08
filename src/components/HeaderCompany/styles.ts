import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { darken } from 'polished';

export const Container = styled.menu`
  width: 15%;
  display: flex;
  flex-direction: column;
`;

export const LogoArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 200px;
    height: 100px;
  }
`;

export const MenuItem = styled(NavLink)`
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  padding-left: 2rem;
  transition: background 0.6s;

  &.selected {
    background: ${(props) => darken(0.04, props.theme.colors.primaryDarker)};
  }

  &:hover {
    background: ${(props) => darken(0.04, props.theme.colors.primaryDarker)};
  }

  svg {
    margin-right: 0.4rem;
  }

  color: ${(props) => props.theme.colors.buttonText};
  font-size: 2rem;
  text-decoration: none;
`;
