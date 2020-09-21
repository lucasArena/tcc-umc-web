import styled from 'styled-components';

import backgroundThings from '../../assets/images/background-things.svg';

export const Container = styled.div`
  background-color: ${(props) => props.theme.colors.primary};
  background-image: url(${backgroundThings});

  display: none;

  @media (min-width: 800px) {
    display: flex;
    align-items: center;
    justify-content: center;
}
    width: 50%;
  }
`;
