import styled from 'styled-components';
import { Form } from '@unform/web';

import Button from '../../../components/Button';

export const Container = styled.div`
  width: 85%;
  background: ${(props) => props.theme.colors.background};
  padding: 10px 30px;
`;

export const ChartContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(1fr);
  margin-top: 20px;
`;

export const ChartItem = styled.section``;

export const Filter = styled(Form)`
  display: flex;
  align-items: center;
`;

export const FilterButton = styled(Button)`
  min-width: 200px;
  margin-left: 10px;
`;
