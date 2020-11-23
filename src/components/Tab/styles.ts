import styled, { css } from 'styled-components';

interface TabProps {
  selected: boolean;
}

export const Container = styled.button<TabProps>`
  color: ${(props) => props.theme.colors.textPrimary};
  display: none;

  ${(props) =>
    props.selected &&
    css`
      display: block;
    `}
`;

export const TabTitle = styled.strong<TabProps>`
  ${(props) =>
    props.selected &&
    css`
      color: ${props.theme.colors.textPrimary};
      border-bottom: 2px solid ${props.theme.colors.primary};
    `}
`;
