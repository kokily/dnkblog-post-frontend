import React from 'react';
import { useRouter } from 'next/router';
import { useMutation, useQuery } from '@apollo/client';
import ReadPost from '../../components/post/ReadPost';
import { REMOVE_POST } from '../../libs/graphql/posts';
import { CHECK_ME } from '../../libs/graphql/auth';
import { MeType, PostType } from '../../libs/types';
import { toast } from 'react-toastify';
import ReadPostButton from '../../components/post/ReadPostButton';

interface ReadPostProps {
  post: PostType;
}

function ReadPostContainer({ post }: ReadPostProps) {
  const router = useRouter();
  const { data, loading } = useQuery<{ CheckMe: { user: MeType | null } }>(CHECK_ME);
  const [RemovePost, { client }] = useMutation(REMOVE_POST);

  const onBack = () => {
    router.back();
  };

  const onEdit = () => {
    router.push(`/edit/${post.id}`);
  };

  const onRemove = async () => {
    try {
      const response = await RemovePost({
        variables: { id: post.id },
      });

      if (!response || !response.data) return;

      await client.clearStore();

      toast.success('포스트 삭제 완료');
      router.back();
    } catch (err) {
      toast.error(err);
    }
  };

  if (loading) return null;

  return (
    <>
      <ReadPost post={post} />
      <ReadPostButton
        me={data?.CheckMe.user || null}
        onBack={onBack}
        onEdit={onEdit}
        onRemove={onRemove}
      />
    </>
  );
}

export default ReadPostContainer;
