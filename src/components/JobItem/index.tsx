import React, { useCallback, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../hooks/auth';

import { Container, Label, ClassesList } from './styles';

interface JobItemProps {
  id: number;
  title: string;
  description: string;
  available: number;
  company: {
    avatar: string;
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
const JobItem: React.FC<JobItemProps> = ({
  id,
  title,
  description,
  company,
  available,
  applications,
}) => {
  const { push } = useHistory();
  const { user } = useAuth();

  const isSignup = useMemo(() => {
    return !!applications.find((applicantion) => {
      return applicantion.user.id === user.id;
    });
  }, [user, applications]);

  const handleJobDetails = useCallback(() => {
    push('/jobDetails', {
      jobId: id,
    });
  }, [push, id]);

  return (
    <Container>
      <header>
        <img
          src={
            (company && company.avatar) ||
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQD6o4MplGmPR_M3Z_mSwecQ3cKlpZzaJOyhQ&usqp=CAU'
          }
          alt={company.profile.trade_name}
        />
        <div>
          <strong>{title}</strong>
        </div>

        {isSignup && <Label>Candidatado</Label>}
      </header>

      <p>{description}</p>
      <ClassesList />
      <footer>
        <div>
          <p>
            Empresa
            <strong>{company.profile.trade_name}</strong>
          </p>
          <p>
            Posições disponíveis
            <strong>{available}</strong>
          </p>
        </div>
        <button type="button" onClick={handleJobDetails}>
          Saiba mais
        </button>
      </footer>
    </Container>
  );
};

export default JobItem;
