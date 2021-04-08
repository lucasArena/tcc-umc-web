import React, { useCallback, useEffect, useState } from 'react';

import { useAuth } from '../../../hooks/auth';
import { useToast } from '../../../hooks/toast';

import api from '../../../services/api';

import {
  Container,
  Top,
  TitleSection,
  Main,
  Item,
  ConfirmPaymentButton,
} from './styles';

interface PaymentProps {
  id: number;
  title: string;
  user: {
    name: string;
    avatar_url?: string;
  };
  status: string;
}

const Payment: React.FC = () => {
  const { user } = useAuth();
  const { addToast } = useToast();

  const [payments, setPayments] = useState<PaymentProps[]>(
    [] as PaymentProps[],
  );

  const handleConfirmPayment = useCallback(
    async (paymentId: number) => {
      try {
        const paymentUpdated = await api.patch<PaymentProps>(
          `/payments/${paymentId}`,
          {
            status: 'Payed',
          },
        );

        const { id: idUpdated, status: statusUpdated } = paymentUpdated.data;

        setPayments((oldPayments) => {
          return oldPayments.map((oldPayment) => {
            if (oldPayment.id === idUpdated) {
              return {
                ...oldPayment,
                status: statusUpdated,
              };
            }

            return oldPayment;
          });
        });

        addToast({
          title: 'Sucesso',
          description: 'Pagamento confirmado com sucesso',
          type: 'success',
        });
      } catch {
        addToast({
          title: 'Erro',
          description: 'Erro ao tentar confirmar pagamento',
          type: 'error',
        });
      }
    },
    [addToast],
  );

  useEffect(() => {
    async function handleGetCompanyJobs() {
      const response = await api.get<PaymentProps[]>(`/payments`);

      setPayments(response.data);
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
        {payments.map((payment) => (
          <Item key={payment.id}>
            <main>
              <img src={payment.user.avatar_url} alt={payment.title} />
              <h3>{payment.user.name}</h3>
            </main>

            <aside>
              {payment.status === 'Payed' ? (
                <h5>Pago</h5>
              ) : (
                <ConfirmPaymentButton
                  onClick={() => handleConfirmPayment(payment.id)}
                >
                  Pagamento recebido
                </ConfirmPaymentButton>
              )}
            </aside>
          </Item>
        ))}
      </Main>
    </Container>
  );
};

export default Payment;
