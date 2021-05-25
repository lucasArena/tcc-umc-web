import styled from 'styled-components';
import { Link, NavLink } from 'react-router-dom';

interface IDropDown {
  isOpen: boolean;
}

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

export const LogoContainer = styled(Link)`
  display: flex;

  img {
    width: 128px;
  }
`;

export const ProfileArea = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  background: transparent;
  border: 0;
  cursor: pointer;

  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 1rem;
  }
`;

export const DropDown = styled.div<IDropDown>`
  position: absolute;
  background: ${(props) => props.theme.colors.primaryDarker};
  top: calc(100% + 24px);
  right: 0;

  width: 256px;
  border-radius: 10px;
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  transition: opacity 0.2s ease 0s, visibility 0.2s ease 0s;

  &::before {
    content: '';
    position: absolute;
    top: -8px;
    right: 19px;
    width: 0px;
    height: 0px;
    border-style: solid;
    border-width: 0px 8px 8px;
    border-color: transparent transparent
      ${(props) => props.theme.colors.primaryDarker};
  }
`;

export const DropDownItem = styled(NavLink)`
  display: flex;
  align-items: center;
  padding: 12px 24px;
  color: ${(props) => props.theme.colors.buttonText};
  text-decoration: none;
  border-radius: inherit;
  transition: ease-in 0.4s;

  svg {
    margin-right: 10px;
  }

  &:hover {
    background: ${({ theme }) => theme.colors.primaryDark};
  }
`;

export const DropDownItemButton = styled.button`
  display: flex;
  align-items: center;
  padding: 12px 24px;
  color: ${(props) => props.theme.colors.buttonText};
  text-decoration: none;
  border-radius: inherit;
  transition: ease-in 0.4s;
  background: transparent;
  border: 0;
  outline: 0;
  cursor: pointer;
  width: 100%;

  svg {
    margin-right: 10px;
  }

  &:hover {
    background: ${({ theme }) => theme.colors.primaryDark};
  }
`;
