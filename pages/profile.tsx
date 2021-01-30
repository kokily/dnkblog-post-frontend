import React from 'react';
import PageContainer from '../containers/common/PageContainer';
import ProfileContainer from '../containers/profile/ProfileContainer';
import useAuth from '../libs/hooks/useAuth';

function ProfilePage() {
  useAuth();

  return (
    <PageContainer>
      <ProfileContainer />
    </PageContainer>
  );
}

export default ProfilePage;
