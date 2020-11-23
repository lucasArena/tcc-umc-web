import styled from 'styled-components';
import { Link, LinkProps } from 'react-router-dom';

export const Container = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: center;

  color: ${(props) => props.theme.colors.textPrimary};
  background: ${(props) => props.theme.colors.primary};
`;

export const Content = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;

  background: ${(props) => props.theme.colors.background};

  @media (min-width: 1100px) {
    flex-direction: row;
    flex: 1;
  }
`;

export const JobList = styled.main`
  margin: 3.2rem auto;
  width: 90%;
  height: 60%;

  @media (min-width: 700px) {
    padding: 3.2rem 0;
    max-width: 740px;
    margin: 0 auto;
  }
`;

export const NoResult = styled.section`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;

  span {
    font-family: Poppins;
    font-size: 1.6rem;
    line-height: 2.6rem;
    max-width: 25rem;
    text-align: center;

    color: ${(props) => props.theme.colors.textComplement};
  }
`;
