import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { useAuth } from '../../../hooks/auth';

import api from '../../../services/api';

import { Container, Top, TitleSection, Main, Item, NoResults } from './styles';

import noResultIcon from '../../../assets/images/no-results.svg';

interface PackageProps {
  id: number;
  name: string;
  type: string;
  mothValue: number;
  yearValue: number;
}

const Jobs: React.FC = () => {
  const { user } = useAuth();
  const [packages, setPackages] = useState<PackageProps[]>(
    [] as PackageProps[],
  );

  useEffect(() => {
    async function handleListAllPackages() {
      const response = await api.get<PackageProps[]>(`/packages`);

      setPackages(response.data);
    }

    handleListAllPackages();
  }, [user.profile.id]);

  return (
    <Container>
      <Top>
        <Link to="/admin/package/create">Criar pacote</Link>
      </Top>
      <TitleSection>
        <h2>Pacotes</h2>
      </TitleSection>
      <Main>
        {packages.length ? (
          packages.map((pack) => (
            <Item key={pack.id} to={`/admin/package/edit/${pack.id}`}>
              <main>
                <h3>{pack.name}</h3>
              </main>
            </Item>
          ))
        ) : (
          <NoResults>
            <img src={noResultIcon} alt="No results found logo" />
            <h2>Não há pacotes cadastradas</h2>
          </NoResults>
        )}
      </Main>
    </Container>
  );
};

export default Jobs;
