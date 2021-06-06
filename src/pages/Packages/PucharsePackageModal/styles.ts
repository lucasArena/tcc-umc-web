import styled from 'styled-components';
import { Form as Unform } from '@unform/web';

export const Form = styled(Unform)`
  padding: 48px 40px;
  display: flex;
  flex-direction: column;

  h1 {
    font-weight: 600;
    font-size: 36px;
    line-height: 36px;
    margin-bottom: 40px;
  }

  section {
    font-size: 2rem;

    strong {
      margin-left: 5px;
    }
  }

  button {
    margin-top: 48px;
    align-self: flex-end;
  }

  button {
    cursor: pointer;
    font-weight: 600;
    border-radius: 8px;
    border: 0;
    background: #39b100;
    color: #fff;

    display: flex;
    flex-direction: row;
    align-items: center;

    .text {
      padding: 16px 24px;
    }

    .icon {
      display: flex;
      padding: 16px 16px;
      background: #41c900;
      border-radius: 0 8px 8px 0;
      margin: 0 auto;
    }
  }
`;

export const DowngradeWarning = styled.h3`
  color: ${({ theme }) => theme.colors.deleteButtonText};
  margin-bottom: 20px;
`;
