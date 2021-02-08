import React from 'react';
import { useRouter } from 'next/router';
import { useMutation, useQuery } from '@apollo/client';
import ReadPost from '../../components/post/ReadPost';
import { READ_POST, REMOVE_POST } from '../../libs/graphql/posts';
import { CHECK_ME } from '../../libs/graphql/auth';
import { MeType, PostType } from '../../libs/types';
import { toast } from 'react-toastify';
import ReadPostButton from '../../components/post/ReadPostButton';
import CommentContainer from '../comment/CommentContainer';

function ReadPostContainer() {
  const router = useRouter();
  const { id }: { id?: string } = router.query;
  const { data, loading } = useQuery<{ CheckMe: { user: MeType | null } }>(CHECK_ME);
  const { data: post, loading: postLoading, error } = useQuery<{
    ReadPost: {
      post: PostType;
      prev: PostType;
      next: PostType;
    };
  }>(READ_POST, {
    variables: { id },
    fetchPolicy: 'network-only',
  });
  const [RemovePost, { client }] = useMutation(REMOVE_POST);

  const onBack = () => {
    router.back();
  };

  const onEdit = () => {
    router.push(`/edit/${id}`);
  };

  const onRemove = async () => {
    try {
      const response = await RemovePost({
        variables: { id },
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
  if (postLoading) return null;
  if (error) return null;

  return (
    <>
      <ReadPost
        post={post.ReadPost.post}
        prev={post.ReadPost.prev}
        next={post.ReadPost.next}
      />
      <ReadPostButton
        me={data?.CheckMe.user || null}
        onBack={onBack}
        onEdit={onEdit}
        onRemove={onRemove}
      />
      <CommentContainer postId={id} user={data?.CheckMe.user || null} />
    </>
  );
}

export default ReadPostContainer;
