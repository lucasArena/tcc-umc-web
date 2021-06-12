import React from 'react';
import { Bar } from 'react-chartjs-2';

import getMoneyValue from '../../utils/getMoneyValue';

import IChart from './interface/Ichart';

import { Container } from './styles';

const Chart: React.FC<IChart> = ({ type, data, options, title, height }) => {
  return (
    <Container style={{ height }}>
      {title && <h3>{title}</h3>}
      <Bar
        type={type}
        height={height}
        data={data}
        options={options}
      />
    </Container>
  );
};

export default Chart;
