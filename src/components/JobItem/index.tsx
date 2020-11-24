import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import { Container, ClassesList } from './styles';

interface JobItemProps {
  id: number;
  title: string;
  description: string;
  company: {
    trade_name: string;
    profile: {
      avatar_url: string;
    };
  };
}
const JobItem: React.FC<JobItemProps> = ({
  id,
  title,
  description,
  company,
}) => {
  const { push } = useHistory();

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
            (company.profile && company.profile.avatar_url) ||
            'https://images6.fanpop.com/image/photos/38200000/Spongebob-Icon-spongebob-squarepants-38211111-200-200.jpg'
          }
          alt={company.trade_name}
        />
        <div>
          <strong>{title}</strong>
          {/* <span>{description}</span> */}
        </div>
      </header>

      <p>{description}</p>
      <ClassesList />
      <footer>
        <p>
          Empresa
          <strong>{company.trade_name}</strong>
        </p>
        <button type="button" onClick={handleJobDetails}>
          Saiba mais
        </button>
      </footer>
    </Container>
  );
};

export default JobItem;
