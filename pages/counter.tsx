import React from 'react';
import PageContainer from '../containers/common/PageContainer';
import CounterContainer from '../containers/counter/CounterContainer';
import useAdmin from '../libs/hooks/useAdmin';

function CounterPage() {
  useAdmin();

  return (
    <PageContainer>
      <CounterContainer />
    </PageContainer>
  );
}

export default CounterPage;
