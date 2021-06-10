import React, { useEffect, useState } from 'react';

import { useAuth } from '../../hooks/auth';

import api from '../../services/api';

import {
  Container,
  Top,
  TitleSection,
  Main,
  Item,
  ApplicationInfo,
  NoResult,
} from './styles';

import noResultIcon from '../../assets/images/no-results.svg';

interface ApplicationProps {
  id: number;
  user: {
    id: number;
    name: string;
    avatar_url: string;
    profile: {
      resume_url: string;
    };
  };
  status: {
    id: number;
    name: string;
  };
  job: {
    id: number;
    title: string;
    available: number;
    company: {
      name: string;
      avatar_url?: string;
    };
  };
}

const UserApplications: React.FC = () => {
  const { user } = useAuth();
  const [applications, setApplications] = useState<ApplicationProps[]>(
    [] as ApplicationProps[],
  );

  useEffect(() => {
    async function handleUserApplications() {
      const response = await api.get<ApplicationProps[]>(
        `/users/${user.id}/applications`,
      );

      setApplications(response.data);
    }

    handleUserApplications();
  }, [user.id]);

  return (
    <Container>
      <Top />
      <TitleSection>
        <h2>Candidaturas</h2>
      </TitleSection>

      <Main>
        {applications.length ? (
          applications.map((application) => (
            <Item key={application.id}>
              <main>
                <ApplicationInfo>
                  <section>
                    <img
                      src={application.job.company.avatar_url}
                      alt={application.job.company.name}
                    />
                    <h3>{application.job.title}</h3>
                  </section>
                  <strong>{`Status: ${application.status.name}`}</strong>
                </ApplicationInfo>
              </main>
            </Item>
          ))
        ) : (
          <NoResult>
            <img src={noResultIcon} alt="No results found logo" />
            <h2>Não há candidaturas cadastradas</h2>
          </NoResult>
        )}
      </Main>
    </Container>
  );
};

export default UserApplications;
