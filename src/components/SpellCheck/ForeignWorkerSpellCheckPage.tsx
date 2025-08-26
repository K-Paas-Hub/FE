import React from 'react';
import ForeignWorkerSpellCheck from './ForeignWorkerSpellCheck';
import MainHeader from '../MainHeader';
import MainFooter from '../MainFooter';
import { MainContainer, MainPageContent } from '../../styles/components/MainPage.styles';

const ForeignWorkerSpellCheckPage: React.FC = () => {
  return (
    <MainContainer>
      <MainHeader />
      <MainPageContent>
        <ForeignWorkerSpellCheck />
      </MainPageContent>
      <MainFooter />
    </MainContainer>
  );
};

export default ForeignWorkerSpellCheckPage;
