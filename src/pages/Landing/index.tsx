import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import {
  Content,
  AdvertiseContainer,
  ButtonBePremiumUser,
  JobList,
  NoResult,
} from './styles';

import api from '../../services/api';
import JobItem from '../../components/JobItem';
import { useAuth } from '../../hooks/auth';

import noResultIcon from '../../assets/images/no-results.svg';

interface JobProps {
  id: number;
  title: string;
  description: string;
  available: number;
  company: {
    avatar_url: string;
    avatar: string;
    profile: {
      trade_name: string;
    };
  };
  applications: {
    applicant: {
      id: number;
    };
  }[];
}

const Landing: React.FC = () => {
  const [jobs, setJobs] = useState<JobProps[]>([]);

  const { user } = useAuth();
  const { push } = useHistory();
  useEffect(() => {
    async function handleGetJobs() {
      const responseJobs = await api.get<JobProps[]>('/jobs/available');

      setJobs(responseJobs.data);
    }

    handleGetJobs();
  }, []);

  const handleButtonBePremium = useCallback(() => {
    push('/packages');
  }, [push]);

  return (
    <Content>
      <JobList>
        <AdvertiseContainer>
          {user.profile_type === 'App\\ApplicantEloquent' && (
            <section>
              <ButtonBePremiumUser onClick={handleButtonBePremium}>
                Transforme-se PREMIUM
              </ButtonBePremiumUser>
            </section>
          )}
        </AdvertiseContainer>
        {jobs.length ? (
          jobs.map((job) => (
            <JobItem
              id={job.id}
              key={job.id}
              company={job.company}
              applications={job.applications}
              title={job.title}
              description={job.description}
              available={job.available}
            />
          ))
        ) : (
          <NoResult>
            <h2>Não há vagas cadastradas</h2>
            <img src={noResultIcon} alt="No results found logo" />
          </NoResult>
        )}
      </JobList>
    </Content>
  );
};

export default Landing;
