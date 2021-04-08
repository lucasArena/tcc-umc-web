import React from 'react';

import { Container } from './styles';

import HeaderCompany from '../../../components/HeaderCompany';

const Company: React.FC = ({ children }) => {
  return (
    <Container>
      <HeaderCompany />
      {children}
    </Container>
  );
};

export default Company;
