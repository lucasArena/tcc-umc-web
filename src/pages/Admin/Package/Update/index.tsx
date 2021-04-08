import React, { useCallback, useState, useRef, useEffect } from 'react';
import * as Yup from 'yup';

import { useHistory, useParams } from 'react-router-dom';
import { FormHandles } from '@unform/core';
import { Container, Form } from './styles';

import warningIcon from '../../../../assets/images/icons/warning.svg';

import InputGroup from '../../../../components/InputGroup';
import Input from '../../../../components/Input';

import api from '../../../../services/api';

import { useToast } from '../../../../hooks/toast';
import Select from '../../../../components/Select';
import InputMoney from '../../../../components/InputMoney';
import getValidationErrors from '../../../../utils/getValidationErrors';

interface PackageType {
  id: string;
}

interface FormProps {
  type: PackageType;
  name: string;
  month_value: string;
  year_value: string;
}

const Profile: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
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

      const formattedYearValue = data.year_value
        .replace(/\s/g, '')
        .replace(/\./g, '')
        .replace(/,/g, '.');

      const dataFormatted = {
        type: data.type,
        name: data.name,
        month_value: formattedMonthValue,
        year_value: formattedYearValue,
      };

      try {
        formRef.current?.setErrors([]);
        const schema = Yup.object().shape({
          name: Yup.string().required('Título obrigatório'),
          type: Yup.string().required('Descrição obrigatório'),
          month_value: Yup.string().required('Valor mensal obrigatório'),
          year_value: Yup.string().required('Valor anual obrigatório'),
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
    [addToast, push, packageId],
  );

  useEffect(() => {
    async function handleGetJob() {
      const response = await api.get<FormProps>(`/packages/${packageId}`);

      setJob(response.data);
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
            <Select
              label="Tipo de vaga"
              id="type"
              name="type"
              placeholder="Selecione"
              width="100%"
              options={[
                { value: 'A', label: 'Candidato' },
                { value: 'C', label: 'Empresa' },
              ]}
            />
          </InputGroup>
          <InputGroup>
            <InputMoney
              prefix="R$"
              label="Valor mensal"
              id="month_value"
              name="month_value"
              width="50%"
            />
            <InputMoney
              prefix="R$"
              label="Valor ano"
              id="year_value"
              name="year_value"
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
          <button type="submit">Editar</button>
        </footer>
      </Form>
    </Container>
  );
};

export default Profile;
