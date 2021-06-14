import styled from 'styled-components';
import { darken } from 'polished';
import { Link } from 'react-router-dom';

interface LabelStatusApplicationProps {
  type: 'Aprovado' | 'Reprovado' | 'Pendente';
}

export const ApplicantList = styled.main`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  max-width: 100%;

  padding: 48px 40px;
`;

export const ApplicantItem = styled.section`
  flex: 1;
  display: flex;
  flex-direction: column;

  padding: 20px 0;

  & + section {
    border-top: 1px solid ${({ theme }) => theme.colors.primaryDarker};
  }

  a {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;

    padding: 10px;
    text-decoration: none;
    min-width: 100px;
    background: ${(props) => props.theme.colors.secundary};
    transition: background 0.4;

    span {
      margin-right: 5px;
      color: ${(props) => props.theme.colors.buttonText};
    }

    &:hover {
      background: ${(props) => darken(0.04, props.theme.colors.secundary)};
    }

    svg {
      color: ${(props) => props.theme.colors.buttonText};
    }
  }

  & + section {
    margin-top: 10px;
  }
`;

export const ApplicantInfo = styled.div`
  header {
    display: flex;
    align-items: center;
    min-width: 60%;
  }

  main {
    display: flex;
    flex-direction: column;

    h3 {
      color: ${({ theme }) => theme.colors.primaryLighter};
    }

    section {
      margin-top: 20px;
    }
  }

  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 10px;
  }

  h4 {
    color: ${(props) => props.theme.colors.primary};
    margin-right: 10px;
  }

  a {
    margin-left: auto;
  }
`;

export const LabelStatusApplication = styled.span<LabelStatusApplicationProps>`
  border-radius: 4px;
  padding: 6px;
  color: ${({ theme }) => theme.colors.lineWhite};

  background: ${({ theme }) => theme.colors.textComplement};

  ${({ type, theme }) =>
    type === 'Aprovado' && {
      background: theme.colors.secundaryDark,
    }};

  ${({ type, theme }) =>
    type === 'Reprovado' && {
      background: theme.colors.deleteButtonText,
    }};
`;

export const ShowResumeButton = styled(Link)``;

export const ApplicantDetails = styled.div`
  display: flex;
  justify-content: space-between;

  margin-top: 10px;

  p {
    text-align: center;
  }
`;

export const ApplicantDetailsProfessional = styled.div`
  display: flex;
  flex-direction: column;

  margin-top: 10px;
`;

export const ApplicantDetailsGroup = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const ApplicantActions = styled.aside`
  display: flex;
  justify-content: flex-end;

  button {
    min-width: 150px;
  }

  div + div {
    margin-left: 10px;
  }
`;
