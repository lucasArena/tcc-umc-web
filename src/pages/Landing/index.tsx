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

interface JobProps {
  id: number;
  title: string;
  description: string;
  available: number;
  company: {
    avatar_url: string;
    profile: {
      trade_name: string;
    };
  };
  applications: {
    user: {
      id: number;
    };
  }[];
}

const Landing: React.FC = () => {
  const [jobs, setJobs] = useState<JobProps[]>([]);

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
          <section>
            <ButtonBePremiumUser onClick={handleButtonBePremium}>
              Transforme-se em premium
            </ButtonBePremiumUser>
          </section>
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
            <span>Nenhuma vaga cadastrada</span>
          </NoResult>
        )}
      </JobList>
    </Content>
  );
};

export default Landing;
