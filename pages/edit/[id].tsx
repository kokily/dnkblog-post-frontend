import React from 'react';
import WriteContainer from '../../containers/write/WriteContainer';
import useAdmin from '../../libs/hooks/useAdmin';

function EditPage() {
  useAdmin();

  return <WriteContainer edit={true} />;
}

export default EditPage;
