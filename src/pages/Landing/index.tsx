import React, { useEffect, useState } from 'react';

import { Content, JobList, NoResult } from './styles';

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

  useEffect(() => {
    async function handleGetJobs() {
      const responseJobs = await api.get<JobProps[]>('/jobs/available');

      setJobs(responseJobs.data);
    }

    handleGetJobs();
  }, []);

  return (
    <Content>
      <JobList>
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
