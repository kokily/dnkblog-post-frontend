import React from 'react';
import { useRouter } from 'next/router';
import { useMutation, useQuery } from '@apollo/client';
import { CHECK_ME, LOGOUT } from '../../libs/graphql/auth';
import { MeType } from '../../libs/types';
import { devClient, isProd, prodClient } from '../../libs/constants';
import PageTemplate from '../../components/common/PageTemplate';

function PageContainer({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [Logout, { client }] = useMutation(LOGOUT);
  const { data, loading } = useQuery<{ CheckMe: { user: MeType | null } }>(CHECK_ME, {
    fetchPolicy: 'network-only',
  });
  const isTag = router.pathname === '/';

  const onLogout = async () => {
    const url = `${isProd ? prodClient : devClient}${router.asPath}`;

    await Logout();
    await client.clearStore();
    await router.replace(url);
  };

  const onWrite = () => {
    router.push('/write');
  };

  const onTag = (name: string) => {
    router.push(`/tag/${name}`);
  };

  if (loading) return null;

  return (
    <PageTemplate
      me={data?.CheckMe.user || null}
      tags={[]}
      all_count={1}
      onLogout={onLogout}
      onWrite={onWrite}
      onTag={onTag}
      isTag={isTag}
      children={children}
    />
  );
}

export default PageContainer;
