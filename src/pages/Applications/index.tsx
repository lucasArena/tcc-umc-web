import React, { useEffect, useState, useCallback } from 'react';
import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';

import api from '../../services/api';

import getMoneyValue from '../../utils/getMoneyValue';

import {
  Container,
  Top,
  TitleSection,
  Main,
  Item,
  ApplicationInfo,
  ButtonApplicantsDetails,
  NoResults,
} from './styles';

import noResultIcon from '../../assets/images/no-results.svg';
import ApplicantsDetailsModal from './ApplicantsDetailsModal';

interface JobProps {
  id: number;
  title: string;
  available: number;
  company: {
    avatar_url?: string;
    avatar?: string;
  };
  applications: Application[];
}
interface Application {
  id: number;
  applicant: {
    id: number;
    name: string;
    email: string;
    phone: string;
    avatar: string;
    avatar_url: string;
    profile: {
      bio: string;
      contract: string;
      salary_expectations: string;
      born: string;
      civil_state: string;
      resume_url: string;
    };
  };
  job: JobProps;
  status: {
    id: number;
    name: 'Aprovado' | 'Reprovado' | 'Pendente';
  };
}

const Applications: React.FC = () => {
  const { user } = useAuth();
  const { addToast } = useToast();

  const [jobs, setJobs] = useState<JobProps[]>([] as JobProps[]);

  const [applicantDetailsModalOpen, setApplicantDetailsModalOpen] = useState(
    false,
  );

  const [modalApplications, setModalApplications] = useState<Application[]>([]);

  function handleShowApplicantsDetails(applications: Application[]): void {
    setModalApplications(applications);
    setApplicantDetailsModalOpen(!applicantDetailsModalOpen);
  }

  function toggleModal(): void {
    setApplicantDetailsModalOpen(!applicantDetailsModalOpen);
  }

  const handleChangeStatusApplication = useCallback(
    async (application_id: number, status_id: number) => {
      const response = await api.patch<Application>(
        `/applications/${application_id}`,
        {
          status: {
            id: status_id,
          },
        },
      );

      const statusApplication = response.data.status;
      const availablePositions = response.data.job.available;

      addToast({
        title: 'Candidatura',
        description: 'Mudança de status de candidatura realizada com sucesso',
        type: 'success',
      });

      setJobs((oldJobs) =>
        oldJobs.map((oldJob) => {
          const applicationsModified = oldJob.applications.map(
            (oldApplication) => {
              if (application_id === oldApplication.id) {
                return {
                  ...oldApplication,
                  status_id: statusApplication.id,
                  status: statusApplication,
                };
              }
              return oldApplication;
            },
          );

          return {
            ...oldJob,
            available: availablePositions,
            applications: applicationsModified,
          };
        }),
      );
    },
    [addToast],
  );

  useEffect(() => {
    async function handleGetCompanyJobs() {
      const response = await api.get<JobProps[]>(
        `/companies/${user.profile.id}/jobs`,
      );

      const dataFormatted = response.data.length
        ? response.data.map((job) => {
            return {
              ...job,
              applications: job.applications.map((application) => {
                const {
                  applicant: { profile, ...rest_applicant },
                  ...rest
                } = application;

                const civilStateFormatted = profile.civil_state
                  ? profile.civil_state
                  : 'Não informado';

                const bornFormatted = profile.born
                  ? profile.born.split('-').reverse().join('/')
                  : 'Não informado';

                const salaryExpectationsFormatted = profile.salary_expectations
                  ? getMoneyValue(Number(profile.salary_expectations))
                  : 'Não informado';

                const contractFormatted = profile.born
                  ? profile.contract
                  : 'Não informado';

                return {
                  ...rest,
                  applicant: {
                    ...rest_applicant,
                    profile: {
                      ...profile,
                      civil_state: civilStateFormatted,
                      born: bornFormatted,
                      salary_expectations: salaryExpectationsFormatted,
                      contract: contractFormatted,
                    },
                  },
                };
              }),
            };
          })
        : [];

      setJobs(dataFormatted);
    }

    handleGetCompanyJobs();
  }, [user.profile.id]);

  return (
    <Container>
      <Top />
      <TitleSection>
        <h2>Candidaturas</h2>
      </TitleSection>

      <Main>
        {jobs.length ? (
          jobs.map((job) => (
            <Item key={job.id}>
              <main>
                <ApplicationInfo>
                  <section>
                    <img
                      src={
                        job.company.avatar
                          ? job.company.avatar_url
                          : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQD6o4MplGmPR_M3Z_mSwecQ3cKlpZzaJOyhQ&usqp=CAU'
                      }
                      alt={job.title}
                    />
                    <h3>{job.title}</h3>
                  </section>

                  <section>
                    {!!job.applications.length && (
                      <ButtonApplicantsDetails
                        type="button"
                        onClick={() =>
                          handleShowApplicantsDetails(job.applications)
                        }
                      >
                        Candidatos
                      </ButtonApplicantsDetails>
                    )}
                    <strong>{`Disponíveis: ${job.available}`}</strong>
                  </section>
                </ApplicationInfo>
              </main>
            </Item>
          ))
        ) : (
          <NoResults>
            <img src={noResultIcon} alt="No results found logo" />
            <h2>Não há candidaturas cadastradas</h2>
          </NoResults>
        )}

        <ApplicantsDetailsModal
          isOpen={applicantDetailsModalOpen}
          setIsOpen={toggleModal}
          handleChangeStatusApplication={handleChangeStatusApplication}
          applications={modalApplications}
          style={{
            height: '90vh',
          }}
        />
      </Main>
    </Container>
  );
};

export default Applications;
