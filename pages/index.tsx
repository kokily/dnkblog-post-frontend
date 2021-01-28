import React from 'react';
import { useQuery } from '@apollo/client';
import { CHECK_ME } from '../libs/graphql/auth';

interface MeType {
  id: string;
  username: string;
  profile: string | null;
  admin: boolean;
  githubId: string | null;
  googleId: string | null;
  email: string | null;
}

function IndexPage() {
  const { data, loading } = useQuery<{ CheckMe: { user: MeType | null } }>(CHECK_ME);

  if (loading) return null;

  return (
    <div>
      <h3>IndexPage</h3>

      {data?.CheckMe.user && (
        <div>
          <h4>{data.CheckMe.user.id}</h4>
        </div>
      )}
    </div>
  );
}

export default IndexPage;
