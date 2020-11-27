import React, { useCallback, useEffect, useState } from 'react';
import { FiDownload } from 'react-icons/fi';

import { Link } from 'react-router-dom';
import Button from '../../components/Button';
import { useAuth } from '../../hooks/auth';

import api from '../../services/api';

import {
  Container,
  Top,
  TitleSection,
  Main,
  Item,
  ApplicationInfo,
  ApplicantList,
  ApplicantInfo,
  ApplicantActions,
} from './styles';

interface JobProps {
  id: number;
  title: string;
  available: number;
  company: {
    profile: {
      avatar_url?: string;
    };
  };
  applications: {
    id: number;
    status_id: number;
    user: {
      id: number;
      name: string;
      avatar_url: string;
      profile: {
        resume_url: string;
      };
    };
    status: {
      name: string;
    };
  }[];
}

interface ApplicationProps {
  job: {
    available: number;
  };
  status: {
    id: number;
    name: string;
  };
}

const Applications: React.FC = () => {
  const { user } = useAuth();
  const [jobs, setJobs] = useState<JobProps[]>([] as JobProps[]);

  const handleChangeStatusApplication = useCallback(
    async (application_id: number, status_id: number) => {
      const response = await api.patch<ApplicationProps>(
        `/applications/${application_id}`,
        {
          status_id,
        },
      );

      const statusApplication = response.data.status;
      const availablePositions = response.data.job.available;

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
    [],
  );

  useEffect(() => {
    async function handleGetCompanyJobs() {
      const response = await api.get<JobProps[]>(
        `/companies/${user.profile.id}/jobs`,
      );

      setJobs(response.data);
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
        {jobs.map((job) => (
          <Item key={job.id}>
            <main>
              <ApplicationInfo>
                <section>
                  <img src={job.company.profile.avatar_url} alt={job.title} />
                  <h3>{job.title}</h3>
                </section>
                <strong>{`Disponíveis: ${job.available}`}</strong>
              </ApplicationInfo>

              <ApplicantList>
                {job.applications.map((application) => (
                  <section key={application.id}>
                    <ApplicantInfo>
                      <img
                        src={application.user.avatar_url}
                        alt={application.user.name}
                      />
                      <h4>{application.user.name}</h4>
                      <Link
                        to={{
                          pathname: application.user.profile.resume_url,
                        }}
                        target="_blank"
                      >
                        <span>Abrir CV</span>
                        <FiDownload width={20} />
                      </Link>
                    </ApplicantInfo>
                    {application.status_id !== 1 ? (
                      <h5>{application.status.name}</h5>
                    ) : (
                        <ApplicantActions>
                          <Button
                            type="button"
                            onClick={() =>
                              handleChangeStatusApplication(application.id, 2)
                            }
                            style={{ background: '#e33d3d' }}
                          >
                            Reprovar
                        </Button>
                          <Button
                            type="button"
                            onClick={() =>
                              handleChangeStatusApplication(application.id, 3)
                            }
                          >
                            Aprovar
                        </Button>
                        </ApplicantActions>
                      )}
                  </section>
                ))}
              </ApplicantList>
            </main>
          </Item>
        ))}
      </Main>
    </Container>
  );
};

export default Applications;
