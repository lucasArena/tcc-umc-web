import React, { useCallback, useEffect, useState } from 'react';
import { format, parse } from 'date-fns';
import * as Yup from 'yup';

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
import getMoneyValue from '../../../utils/getMoneyValue';
import { useMemo } from 'react';
import getValidationErrors from '../../../utils/getValidationErrors';
import { useRef } from 'react';
import { useToast } from '../../../hooks/toast';
import { FormHandles } from '@unform/core';

const Report: React.FC = () => {
  const { isLoading, handleLoading } = useLoad();
  const formFilterRef = useRef<FormHandles>(null);
  const { addToast } = useToast();

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

  const handleFilter = useCallback(async (filterData: IPaymentFilter) => {
    try {
      formFilterRef.current?.setErrors([]);
      const { date_filter } = filterData;

      const dateFormatted = date_filter.split('/').reverse().join('-');
      const dateParsed = parse(dateFormatted, 'yyyy-M', new Date());

      const schema = Yup.object().shape({
        date_filter: Yup.date().test(
          'test_valid_date',
          'Data inválida',
          (date) => {
            if (!date) {
              return false;
            }

            if (isNaN(date.getTime())) {
              throw new Error('Data inválida');
            }

            return true;
          },
        ).required('Data é obrigatório para filtrar'),
      });

      await schema.validate({ date_filter: dateParsed }, {
        abortEarly: false,
      });

      setDate(dateParsed);
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errors = getValidationErrors(error);
        formFilterRef.current?.setErrors(errors);

        addToast({
          title: 'Erro',
          description: 'Data inválida',
          type: 'error',
        });
        return;
      }

      addToast({
        title: 'Erro',
        description: `Erro ao tentar atualizar o cadastro`,
        type: 'error',
      });
      console.log(error);
    }
  }, [addToast]);

  const colorBackground = useMemo(() => {
    return Array.from(
      { length: paymentsPerDay.labels && paymentsPerDay.labels.length },
      () => 'rgba(255, 99, 132, 0.2)',
    );
  }, [paymentsPerDay])

  return (
    <Container>
      <Filter ref={formFilterRef} onSubmit={handleFilter} initialData={{
        date_filter: format(date, 'MM/Y')
      }}>
        <InputMask
          mask="99/9999"
          name="date_filter"
          id="date_filter"
          width="25%"
          placeholder="Pesquisar data (mês-ano)"
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
                  backgroundColor: colorBackground,
                  borderWidth: 1,
                },
              ],
            }}
            height={400}
            options={{
              maintainAspectRatio: false,
              scales: {
                y: {
                  ticks: {
                    callback: function (value: any) {
                      return getMoneyValue(value);
                    }
                  }
                }
              },
              plugins: {
                legend: {
                  position: 'bottom',
                }
              },
            }}
          />
        </ChartItem>
      </ChartContainer>
    </Container>
  );
};

export default Report;
