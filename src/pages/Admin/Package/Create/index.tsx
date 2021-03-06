import React, { useCallback, useState, useRef } from 'react';
import * as Yup from 'yup';

import { useHistory } from 'react-router-dom';
import { FormHandles } from '@unform/core';
import { Container, Form } from './styles';

import warningIcon from '../../../../assets/images/icons/warning.svg';

import InputGroup from '../../../../components/InputGroup';
import Input from '../../../../components/Input';

import api from '../../../../services/api';

import { useToast } from '../../../../hooks/toast';
import InputMoney from '../../../../components/InputMoney';
import getValidationErrors from '../../../../utils/getValidationErrors';

interface PackageType {
  id: string;
}

interface FormProps {
  type: PackageType;
  name: string;
  month_value: string;
  quantity: number;
}

const Profile: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const { push } = useHistory();

  const [job] = useState<FormProps>({} as FormProps);

  const handleSubmit = useCallback(
    async (data: FormProps) => {
      formRef.current?.setErrors([]);

      const formattedMonthValue = data.month_value
        .replace(/\s/g, '')
        .replace(/\./g, '')
        .replace(/,/g, '.');

      const dataFormatted = {
        name: data.name,
        quantity: data.quantity,
        month_value: formattedMonthValue,
      };

      try {
        formRef.current?.setErrors([]);
        const schema = Yup.object().shape({
          name: Yup.string().required('Título obrigatório'),
          quantity: Yup.number().required('Quantidade de vagas obrigatória'),
          month_value: Yup.string().required('Valor mensal obrigatório'),
        });

        await schema.validate(dataFormatted, {
          abortEarly: false,
        });

        await api.post(`/packages`, dataFormatted);

        addToast({
          title: 'Successo',
          description: 'Pacote criado com sucesso',
          type: 'success',
        });

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

        addToast({
          title: 'Erro',
          description: 'Erro ao tentar alterar o pacote',
          type: 'error',
        });
      }
    },
    [addToast, push],
  );

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
          <button type="submit">Criar</button>
        </footer>
      </Form>
    </Container>
  );
};

export default Profile;
