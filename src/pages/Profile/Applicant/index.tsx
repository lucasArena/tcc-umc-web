import React, {
  useCallback,
  useState,
  useRef,
  useEffect,
  ChangeEvent,
} from 'react';
import { FiCamera, FiUpload } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { cpf as cpfValidator } from 'cpf-cnpj-validator';
import * as Yup from 'yup';

import { parseISO, isValid, format } from 'date-fns';
import {
  ProfileInfo,
  AvatarContainer,
  Form,
  UploadArea,
  ResumeUploadContainer,
  ResumeLogo,
  SubmitButton,
} from './styles';

import warningIcon from '../../../assets/images/icons/warning.svg';
import pdfIcon from '../../../assets/images/icons/pdf.svg';

import InputGroup from '../../../components/InputGroup';
import Input from '../../../components/Input';
import Textarea from '../../../components/TextArea';
import Select from '../../../components/Select';
import api from '../../../services/api';
import InputMask from '../../../components/InputMask';
import InputMoney from '../../../components/InputMoney';

import { useAuth } from '../../../hooks/auth';
import { useToast } from '../../../hooks/toast';
import getValidationErrors from '../../../utils/getValidationErrors';
import { useLoad } from '../../../hooks/load';

interface SelectProps {
  value: string;
  label: string;
}
interface FormProps {
  name: string;
  email: string;
  avatar_url: string;
  born: string;
  cpf: string;
  phone: string;
  country_id: string;
  bio: string;
  civil_state: string;
  salary_expectations: string;
  contract: string;
  gender: string;
  resume_url: string;
}

interface CountriesProps {
  id: number;
  name: string;
}

const Profile: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { isLoading, handleLoading } = useLoad();
  const { addToast } = useToast();
  const { user, updateUser } = useAuth();

  const [id] = useState(user.id);
  const [userData, setUserData] = useState<FormProps>({} as FormProps);
  const [countries, setCountries] = useState<SelectProps[]>([]);

  const handleValidateCPF = useCallback(
    async (value: string): Promise<void> => {
      try {
        const cpfFormatted = value.replace(/\D/g, '');
        const errorAlreadySet: any = formRef.current?.getErrors();

        if (user.profile.cpf === cpfFormatted) {
          delete errorAlreadySet.cpf;
          formRef.current?.setErrors(errorAlreadySet);
          return;
        }

        if (!cpfFormatted || 'cpf' in errorAlreadySet) {
          return;
        }

        await api.get(`/applicants/cpf/${cpfFormatted}`);
      } catch (error) {
        formRef.current?.setErrors({ cpf: 'CPF já existente ' });

        addToast({
          title: 'CPF',
          description: 'CPF já existente',
          type: 'error',
        });
      }
    },
    [addToast, user.profile.cpf],
  );

  const handleSubmit = useCallback(
    async (data: FormProps) => {
      formRef.current?.setErrors([]);
      handleLoading(true);

      const formattedSalaryExpectations = data.salary_expectations
        .replace(/\s/g, '')
        .replace(/\./g, '')
        .replace(/,/g, '.');

      const formattedPhone = data.phone.replace(/\D/g, '');
      const formattedCPF = data.cpf.replace(/\D/g, '');
      const formattedBorn = data.born.split('/').reverse().join('-');

      const dataFormatted = {
        name: data.name.replace(/[^a-zA-Z ]+/g, ''),
        email: data.email,
        bio: data.bio,
        phone: formattedPhone,
        contract: data.contract,
        cpf: formattedCPF,
        born: formattedBorn,
        salary_expectations: formattedSalaryExpectations,
        country: {
          id: data.country_id,
        },
        civil_state: data.civil_state,
      };

      try {
        try {
          if (dataFormatted.cpf && user.profile.cpf !== dataFormatted.cpf) {
            await api.get(`/applicants/cpf/${dataFormatted.cpf}`);
          }
        } catch (error) {
          formRef.current?.setErrors({ cpf: 'CPF já existente ' });

          addToast({
            title: 'CPF',
            description: 'CPF já existente',
            type: 'error',
          });

          handleLoading(false);
          return;
        }

        const schema = Yup.object().shape({
          born: Yup.string().test(
            'born_date',
            'Data inválida',
            function testDateValid(bornDate) {
              if (!bornDate) {
                return false;
              }

              const isValidDate = parseISO(bornDate);

              if (!isValid(isValidDate)) {
                return false;
              }

              return true;
            },
          ),
          cpf: Yup.string()
            .test(
              'cpf_validate',
              'CPF inválido',
              function isValidCPF(checkCPF) {
                if (!checkCPF) {
                  return false;
                }

                if (!cpfValidator.isValid(checkCPF)) {
                  return false;
                }

                return true;
              },
            )
            .required('CPF obrigatório'),
          civil_state: Yup.string().required('Estado cívil obrigatória'),
          country: Yup.object().shape({
            id: Yup.string().required('Nacionalidade obrigatória'),
          }),
          bio: Yup.string().required('Apresentação obrigatória'),
          phone: Yup.string()
            .min(11, 'Telefone inválido')
            .required('Telefone obrigatório'),
          salary_expectations: Yup.string().required(
            'Pretensão salarial obrigatória',
          ),
          contract: Yup.string().required('Contrato obrigatória'),
          name: Yup.string().required('Nome obrigatório'),
          email: Yup.string()
            .email('Email inválido')
            .required('Email obrigatório'),
        });

        await schema.validate(dataFormatted, {
          abortEarly: false,
        });

        const userUpdated = await api.put(`/users/${id}`, {
          name: dataFormatted.name,
          email: dataFormatted.email,
          phone: dataFormatted.phone,
          profile_type: 'App\\ApplicantEloquent',
          profile: {
            id: user.profile.id,
            bio: dataFormatted.bio,
            cpf: dataFormatted.cpf,
            born: dataFormatted.born,
            salary_expectations: dataFormatted.salary_expectations,
            civil_state: dataFormatted.civil_state,
            gender: 'M',
            contract: dataFormatted.contract,
            country: {
              id: dataFormatted.country.id,
            },
          },
        });

        updateUser(userUpdated.data);

        addToast({
          type: 'success',
          title: 'Successo',
          description: 'Usuário atualizado com sucesso',
        });
        handleLoading(false);
      } catch (err) {
        handleLoading(false);

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
          description: `Erro ao tentar atualizar o cadastro`,
          type: 'error',
        });
      }
    },
    [
      id,
      user.profile.id,
      user.profile.cpf,
      addToast,
      updateUser,
      handleLoading,
    ],
  );

  const handleAvatarUpdate = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const formAvatar = new FormData();

        formAvatar.append('image', e.target.files[0]);

        const response = await api.post(`/avatar/${id}`, formAvatar);

        updateUser(response.data);

        addToast({
          type: 'success',
          title: 'Avatar atualizado!',
        });
      }
    },
    [id, updateUser, addToast],
  );

  const handleUpdateResume = useCallback(
    async (e: ChangeEvent<HTMLInputElement>): Promise<void> => {
      if (e.target.files) {
        const resumeFormData = new FormData();

        resumeFormData.append('image', e.target.files[0]);

        const response = await api.post(`/users/${id}/resume`, resumeFormData);

        updateUser(response.data);

        addToast({
          type: 'success',
          title: 'Currículo atualizado com sucesso',
        });
      }
    },
    [id, addToast, updateUser],
  );

  useEffect(() => {
    async function handleGetUser() {
      try {
        const [responseUserData, responseCountriesData] = await Promise.all([
          api.get(`/users/${id}`),
          api.get<CountriesProps[]>(`/countries`),
        ]);

        const userInfo = responseUserData.data;
        const countriesInfo = responseCountriesData.data;

        const {
          name,
          email,
          phone,
          avatar_url,
          profile: {
            gender,
            country_id,
            cpf,
            born,
            bio,
            civil_state,
            salary_expectations,
            contract,
            resume_url,
          },
        } = userInfo;

        setUserData({
          name,
          email,
          avatar_url,
          country_id,
          gender,
          cpf,
          phone,
          born: born && format(parseISO(born), 'dd/MM/Y'),
          bio,
          civil_state,
          salary_expectations: Number(salary_expectations).toFixed(2),
          contract,
          resume_url,
        });

        const countriesFormatted = countriesInfo.map(
          (country: CountriesProps) => {
            return {
              value: String(country.id),
              label: country.name,
            };
          },
        );

        setCountries(countriesFormatted);
      } catch (err) {
        console.log(err);
        addToast({
          title: 'Erro',
          description: 'Erro ao tentar resgatar os dados do usuário',
          type: 'error',
        });
      }
    }

    handleGetUser();
  }, [addToast, id]);
  return (
    <>
      <ProfileInfo>
        <AvatarContainer htmlFor="avatar">
          <input type="file" id="avatar" onChange={handleAvatarUpdate} />
          <img
            src={
              user.avatar
                ? user.avatar_url
                : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQD6o4MplGmPR_M3Z_mSwecQ3cKlpZzaJOyhQ&usqp=CAU'
            }
            alt={user.name}
          />
          <div>
            <FiCamera />
          </div>
        </AvatarContainer>

        <h2>{user.name}</h2>
      </ProfileInfo>
      <Form onSubmit={handleSubmit} ref={formRef} initialData={userData}>
        <fieldset>
          <legend>Seus dados</legend>
          <InputGroup>
            <Input label="Nome" name="name" id="name" />
          </InputGroup>
          <InputGroup>
            <Input label="Email" name="email" id="email" width="40%" disabled />
            <InputMask
              label="Telefone"
              mask="(99) 99999-9999"
              width="30%"
              name="phone"
              placeholder="Telefone"
            />
            <InputMask
              mask="99/99/9999"
              label="Nascimento"
              name="born"
              id="born"
              width="30%"
            />
          </InputGroup>

          <InputGroup>
            <InputMask
              mask="999.999.999-99"
              label="CPF"
              name="cpf"
              id="cpf"
              width="40%"
              onBlur={(e) => handleValidateCPF(e.target.value)}
            />
            <Select
              label="Estado civil"
              name="civil_state"
              id="civil_status"
              width="30%"
              placeholder="Selecione"
              options={[
                { value: 'Solteiro', label: 'Solteiro' },
                { value: 'Casado', label: 'Casado' },
                { value: 'Divorciado', label: 'Divorciado' },
                {
                  value: 'Separado judicialmente',
                  label: 'Separado judicialmente',
                },
                { value: 'Viúvo', label: 'Viúvo' },
              ]}
            />

            <Select
              label="Nacionalidade"
              name="country_id"
              id="nationality"
              width="30%"
              placeholder="Selecione"
              options={countries.map((country) => {
                return {
                  value: country.value,
                  label: country.label,
                };
              })}
            />
          </InputGroup>
        </fieldset>

        <fieldset>
          <legend>Informações para empresas</legend>
          <Textarea
            label="Apresentação"
            id="bio"
            name="bio"
            maxLength={500}
            placeholder="Digite no máximo até 500 caracteres"
          />

          <InputGroup>
            <InputMoney
              prefix="R$"
              label="Pretensão salarial"
              id="salary_expectations"
              name="salary_expectations"
              width="50%"
            />

            <Select
              label="Contrato"
              id="contract"
              name="contract"
              placeholder="Selecione"
              width="50%"
              options={[
                { value: 'CLT', label: 'CLT' },
                { value: 'PJ', label: 'PJ' },
                { value: 'Freelance', label: 'Freelance' },
                { value: 'Temporário', label: 'Temporario' },
              ]}
            />
          </InputGroup>
        </fieldset>

        <fieldset>
          <legend>Curriculo</legend>
          <ResumeUploadContainer>
            <InputGroup
              additionalStyles={{ diplay: 'flex', justifyContent: 'center' }}
            >
              <UploadArea>
                <label htmlFor="resume">
                  <span>Upload do currículo</span>
                  <FiUpload />
                  <input
                    type="file"
                    id="resume"
                    accept="application/pdf,application/vnd.ms-excel"
                    onChange={handleUpdateResume}
                  />
                </label>
              </UploadArea>
            </InputGroup>

            <InputGroup
              additionalStyles={{ diplay: 'flex', justifyContent: 'center' }}
            >
              {user.profile.resume ? (
                <a
                  href={String(user.profile.resume_url)}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <ResumeLogo src={pdfIcon} alt="Logo de pdf" />
                </a>
              ) : (
                <span>Nenhum currículo cadastrado</span>
              )}
            </InputGroup>
          </ResumeUploadContainer>
        </fieldset>
        <footer>
          <p>
            <img src={warningIcon} alt="Aviso importante" />
            Importante
            <br />
            Preencha todos os dados
          </p>
          <SubmitButton type="submit" disabled={isLoading}>
            {isLoading ? 'Processando...' : 'Atualizar'}
          </SubmitButton>
        </footer>
      </Form>
    </>
  );
};

export default Profile;
