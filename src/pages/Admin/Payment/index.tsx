import React, { useCallback, useEffect, useState } from 'react';

import { useAuth } from '../../../hooks/auth';
import { useToast } from '../../../hooks/toast';

import api from '../../../services/api';

import noResultIcon from '../../../assets/images/no-results.svg';

import {
  Container,
  Top,
  TitleSection,
  Main,
  Item,
  ButtonContainer,
  ConfirmPaymentButton,
  NoResults,
} from './styles';

type PaymentOptions = 'Pendent' | 'Paid' | 'Reproved' | 'Canceled';
interface PaymentProps {
  id: number;
  title: string;
  user: {
    name: string;
    avatar: string;
    avatar_url?: string;
  };
  status: PaymentOptions;
  buttonDisplay?: string;
}

const Payment: React.FC = () => {
  const { user } = useAuth();
  const { addToast } = useToast();

  const [payments, setPayments] = useState<PaymentProps[]>(
    [] as PaymentProps[],
  );

  const handleConfirmPayment = useCallback(
    async (paymentId: number, status: string) => {
      try {
        const paymentUpdated = await api.patch<PaymentProps>(
          `/payments/${paymentId}`,
          {
            status,
          },
        );

        const { id: idUpdated, status: statusUpdated } = paymentUpdated.data;

        const statusUpdatedCast: PaymentOptions = statusUpdated;

        const displayButtonOptions = {
          Pendent: 'Pendente',
          Paid: 'Pago',
          Reproved: 'Reprovado',
          Canceled: 'Cancelado',
        };

        setPayments((oldPayments) => {
          return oldPayments.map((oldPayment) => {
            if (oldPayment.id === idUpdated) {
              return {
                ...oldPayment,
                status: statusUpdated,
                buttonDisplay: displayButtonOptions[statusUpdatedCast],
              };
            }

            return oldPayment;
          });
        });

        addToast({
          title: 'Sucesso',
          description: 'Pagamento alterado com sucesso',
          type: 'success',
        });
      } catch (err) {
        addToast({
          title: 'Erro',
          description: 'Erro ao tentar alterar pagamento',
          type: 'error',
        });
      }
    },
    [addToast],
  );

  useEffect(() => {
    async function handleGetCompanyJobs() {
      const response = await api.get<PaymentProps[]>(`/payments`);

      const paymentsFormatted = response.data.map((payment) => {
        switch (payment.status) {
          case 'Paid':
            return {
              ...payment,
              buttonDisplay: 'Pago',
            };
          case 'Reproved':
            return {
              ...payment,
              buttonDisplay: 'Reprovado',
            };
          case 'Canceled':
            return {
              ...payment,
              buttonDisplay: 'Cancelado',
            };
          default:
            return { ...payment };
        }
      });
      setPayments(paymentsFormatted);
    }

    handleGetCompanyJobs();
  }, [user.profile.id]);

  return (
    <Container>
      <Top />
      <TitleSection>
        <h2>Pagamentos</h2>
      </TitleSection>
      <Main>
        {payments.length ? (
          payments.map((payment) => (
            <Item key={payment.id}>
              <main>
                <img
                  src={
                    payment.user.avatar
                      ? payment.user.avatar_url
                      : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQD6o4MplGmPR_M3Z_mSwecQ3cKlpZzaJOyhQ&usqp=CAU'
                  }
                  alt={payment.title}
                />
                <h3>{payment.user.name}</h3>
              </main>

              <aside>
                {payment.status !== 'Pendent' ? (
                  <h5>{payment.buttonDisplay}</h5>
                ) : (
                  <ButtonContainer>
                    <ConfirmPaymentButton
                      style={{
                        background: 'red',
                        padding: '20px',
                      }}
                      onClick={() =>
                        handleConfirmPayment(payment.id, 'Reproved')
                      }
                    >
                      Pagamento negado
                    </ConfirmPaymentButton>
                    <ConfirmPaymentButton
                      style={{
                        background: 'green',
                        padding: '20px',
                      }}
                      onClick={() => handleConfirmPayment(payment.id, 'Paid')}
                    >
                      Pagamento recebido
                    </ConfirmPaymentButton>
                  </ButtonContainer>
                )}
              </aside>
            </Item>
          ))
        ) : (
          <NoResults>
            <img src={noResultIcon} alt="No results found logo" />
            <h2>Não há pagamentos cadastrados</h2>
          </NoResults>
        )}
      </Main>
    </Container>
  );
};

export default Payment;
