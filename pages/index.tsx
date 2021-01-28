import React from 'react';
import { useRouter } from 'next/dist/client/router';
import { useMutation, useQuery } from '@apollo/client';
import { CHECK_ME, LOGOUT } from '../libs/graphql/auth';

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
  const router = useRouter();
  const { data, loading } = useQuery<{ CheckMe: { user: MeType | null } }>(CHECK_ME);
  const [Logout, { client }] = useMutation(LOGOUT);

  const onLogout = async () => {
    await Logout();
    await client.clearStore();
    await router.reload();
  };

  if (loading) return null;

  return (
    <div>
      <h3>IndexPage</h3>

      {data?.CheckMe.user && (
        <>
          <div>
            <h4>{data.CheckMe.user.id}</h4>
          </div>

          <div>
            <button onClick={onLogout}>Logout</button>
          </div>
        </>
      )}
    </div>
  );
}

export default IndexPage;
