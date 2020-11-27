import styled from 'styled-components';

export const Container = styled.div`
  width: 85%;
  background: ${(props) => props.theme.colors.background};
  padding: 10px 30px;
`;

export const Top = styled.section`
  display: flex;
  justify-content: space-between;

  a {
    min-width: 200px;
    border: 0;
    border-radius: 8px;
    padding: 16px 0;
    outline: 0;

    font-weight: 600;
    font-size: 16px;
    text-align: center;
    text-decoration: none;
    line-height: 26px;
    color: ${(props) => props.theme.colors.boxBase};
    background: ${(props) => props.theme.colors.secundary};
    cursor: pointer;
    transition: background 0.4s;

    &:hover {
      background: ${(props) => props.theme.colors.secundaryDark};
    }
  }
`;

export const TitleSection = styled.section`
  margin-top: 60px;

  h2 {
    color: ${(props) => props.theme.colors.primary};
  }
`;

export const Main = styled.main`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const Header = styled.section`
  display: flex;

  color: ${(props) => props.theme.colors.primaryDarker};
  font-size: 2.4rem;
  font-weight: bolder;

  div {
    display: flex;
    justify-content: center;
    flex: 1;
  }
`;

export const Body = styled.section`
  display: flex;
  flex-direction: column;
`;

export const Row = styled.div`
  display: flex;
  justify-content: space-between;

  padding: 10px;
  background: ${(props) => props.theme.colors.primaryDark};
  border-radius: 4px;
  transition: 0.4s;

  &:hover {
    transform: scale(1.02);
  }

  & + div {
    margin-top: 10px;
  }

  div {
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;

    text-align: left;
    font-size: 18px;
    font-weight: bolder;
    color: ${(props) => props.theme.colors.titlePrimary};
  }

  /* justify-content: space-around; */
`;
