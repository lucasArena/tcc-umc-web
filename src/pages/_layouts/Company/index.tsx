import React from 'react';

import { Container } from './styles';

import HeaderAdmin from '../../../components/HeaderAdmin';

const Company: React.FC = ({ children }) => {
  return (
    <Container>
      <HeaderAdmin />
      {children}
    </Container>
  );
};

export default Company;
