import React, { useCallback, useState, useRef, useEffect } from 'react';
import * as Yup from 'yup';

import { useHistory, useParams } from 'react-router-dom';
import { FormHandles } from '@unform/core';
import { Container, Form, ButtonSubmit } from './styles';

import warningIcon from '../../../../assets/images/icons/warning.svg';

import InputGroup from '../../../../components/InputGroup';
import Input from '../../../../components/Input';

import api from '../../../../services/api';

import { useToast } from '../../../../hooks/toast';
import InputMoney from '../../../../components/InputMoney';
import getValidationErrors from '../../../../utils/getValidationErrors';
import { useLoad } from '../../../../hooks/load';

interface PackageType {
  id: string;
}

interface FormProps {
  name: string;
  month_value: string;
  quantity: number;
}

const Profile: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { isLoading, handleLoading } = useLoad();
  const { addToast } = useToast();
  const { push } = useHistory();
  const { packageId } = useParams();

  const [job, setJob] = useState<FormProps>({} as FormProps);

  const handleSubmit = useCallback(
    async (data: FormProps) => {
      formRef.current?.setErrors([]);

      const formattedMonthValue = data.month_value
        .replace(/\s/g, '')
        .replace(/\./g, '')
        .replace(/,/g, '.');

      const dataFormatted = {
        name: data.name,
        month_value: formattedMonthValue,
        quantity: data.quantity,
      };

      try {
        handleLoading(true);
        formRef.current?.setErrors([]);
        const schema = Yup.object().shape({
          name: Yup.string().required('Título obrigatório'),
          quantity: Yup.number()
            .min(1, 'Quantidade deve ser no mínimo 1')
            .required('Quantidade de vagas obrigatória'),
          month_value: Yup.string().required('Valor mensal obrigatório'),
        });

        await schema.validate(dataFormatted, {
          abortEarly: false,
        });

        await api.put(`/packages/${packageId}`, dataFormatted);

        addToast({
          title: 'Successo',
          description: 'Pacote alterada com sucesso',
          type: 'success',
        });

        handleLoading(false);
        push('/admin/packages');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);

          err.errors.forEach((error) => {
            addToast({
              title: 'Erro',
              description: error,
              type: 'error',
            });
          });
          return;
        }

        handleLoading(false);
        addToast({
          title: 'Erro',
          description: 'Erro ao tentar alterar o pacote',
          type: 'error',
        });
      }
    },
    [addToast, push, packageId, handleLoading],
  );

  useEffect(() => {
    async function handleGetJob() {
      const response = await api.get(`/packages/${packageId}`);

      const { name, monthValue, quantity } = response.data;

      setJob({
        name,
        quantity,
        month_value: monthValue.toFixed(2),
      });
    }

    handleGetJob();
  }, [packageId]);

  return (
    <Container>
      <Form onSubmit={handleSubmit} ref={formRef} initialData={job}>
        <fieldset>
          <legend>Dados do pacote</legend>
          <InputGroup>
            <Input label="Nome" name="name" id="name" />
          </InputGroup>

          <InputGroup>
            <Input
              type="number"
              label="Quantidade de vagas"
              name="quantity"
              id="quantity"
              width="50%"
            />
            <InputMoney
              prefix="R$"
              label="Valor mensal"
              id="month_value"
              name="month_value"
              width="50%"
            />
          </InputGroup>
        </fieldset>
        <footer>
          <p>
            <img src={warningIcon} alt="Aviso importante" />
            Importante
            <br />
            Preencha todos os dados
          </p>
          <ButtonSubmit type="submit" disabled={isLoading}>
            {isLoading ? 'Processando...' : 'Editar'}
          </ButtonSubmit>
        </footer>
      </Form>
    </Container>
  );
};

export default Profile;
