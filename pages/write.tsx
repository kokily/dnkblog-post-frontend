import React from 'react';
import useAdmin from '../libs/hooks/useAdmin';
import WriteContainer from '../containers/write/WriteContainer';

function WritePage() {
  useAdmin();

  return <WriteContainer />;
}

export default WritePage;
