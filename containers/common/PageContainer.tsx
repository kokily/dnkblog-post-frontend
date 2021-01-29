import React from 'react';
import { useRouter } from 'next/router';
import { useMutation, useQuery } from '@apollo/client';
import { CHECK_ME, LOGOUT } from '../../libs/graphql/auth';
import { TOP_TAGS_LIST } from '../../libs/graphql/tags';
import { MeType, TagType } from '../../libs/types';
import { devClient, isProd, prodClient } from '../../libs/constants';
import PageTemplate from '../../components/common/PageTemplate';

function PageContainer({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [Logout, { client }] = useMutation(LOGOUT);
  const { data, loading } = useQuery<{ CheckMe: { user: MeType | null } }>(CHECK_ME, {
    fetchPolicy: 'network-only',
  });
  const { data: tagData, loading: tagLoading } = useQuery<{
    TopTagsList: { tags: TagType[] | null; all_count: number };
  }>(TOP_TAGS_LIST);
  const isTag = router.pathname === '/';

  const onLogout = async () => {
    const url = `${isProd ? prodClient : devClient}${router.asPath}`;

    await Logout();
    await client.clearStore();
    window.location.href = url;
  };

  const onWrite = () => {
    router.push('/write');
  };

  const onTag = (name: string) => {
    router.push(`/tag/${name}`);
  };

  if (loading) return null;
  if (tagLoading) return null;

  return (
    <PageTemplate
      me={data?.CheckMe.user || null}
      tags={tagData?.TopTagsList.tags || []}
      all_count={tagData?.TopTagsList.all_count || 0}
      onLogout={onLogout}
      onWrite={onWrite}
      onTag={onTag}
      isTag={isTag}
      children={children}
    />
  );
}

export default PageContainer;
