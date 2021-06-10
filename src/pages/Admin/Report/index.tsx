import React, { useCallback, useEffect, useState } from 'react';
import { parse } from 'date-fns';

import {
  Container,
  ChartContainer,
  ChartItem,
  Filter,
  FilterButton,
} from './styles';

import {
  IPaymentsPerDay,
  IPaymentChart,
  IPaymentFilter,
} from './interfaces/Ireports';

import { useLoad } from '../../../hooks/load';
import api from '../../../services/api';

import Chart from '../../../components/Chart';
import InputMask from '../../../components/InputMask';

const Report: React.FC = () => {
  const { isLoading, handleLoading } = useLoad();

  const [date, setDate] = useState<Date>(new Date());
  const [paymentsPerDay, setPaymentsPerDay] = useState<IPaymentChart>(
    {} as IPaymentChart,
  );

  useEffect(() => {
    async function handleGetPaymentsPerMonth() {
      handleLoading(true);
      const month = date.getMonth() + 1;
      const year = date.getFullYear();

      const { data: paymentsData } = await api.get<IPaymentsPerDay[]>(
        `/payments/month`,
        {
          params: {
            month,
            year,
          },
        },
      );

      const labels = [] as string[];
      const data = [] as number[];

      for (let index = 0; paymentsData.length > index; index++) {
        labels.push(paymentsData[index].day);
        data.push(paymentsData[index].total);
      }

      setPaymentsPerDay({
        labels,
        data,
      });

      handleLoading(false);
    }

    handleGetPaymentsPerMonth();
  }, [date, handleLoading]);

  const handleFilter = useCallback((filterData: IPaymentFilter) => {
    const { date_filter } = filterData;

    const dateFormatted = date_filter.split('/').reverse().join('-');
    const dateParsed = parse(dateFormatted, 'yyyy-M', new Date());

    if (isNaN(dateParsed.getTime())) {
      throw new Error('Data inválida');
    }

    setDate(dateParsed);
  }, []);

  return (
    <Container>
      <Filter onSubmit={handleFilter}>
        <InputMask
          mask="99/9999"
          name="date_filter"
          id="date_filter"
          width="25%"
          placeholder="Pesquisar data"
        />
        <FilterButton type="submit" disabled={isLoading}>
          {isLoading ? 'Pesquisando...' : 'Pesquisar'}
        </FilterButton>
      </Filter>
      <ChartContainer>
        <ChartItem>
          <h2>Relatório de pagamento</h2>
          <Chart
            type="bar"
            data={{
              labels: paymentsPerDay.labels,
              datasets: [
                {
                  label: 'Valor em reais',
                  data: paymentsPerDay.data,
                  backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                  ],
                  borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                  ],
                  borderWidth: 1,
                },
              ],
            }}
            height={400}
          />
        </ChartItem>
      </ChartContainer>
    </Container>
  );
};

export default Report;
