import React from 'react';
import { useRouter } from 'next/router';
import { useApolloClient, useMutation } from '@apollo/client';
import { toast } from 'react-toastify';
import { isProd, prodServer, devServer } from '../../libs/constants';
import { PostType } from '../../libs/types';
import { ADD_POST, UPDATE_POST } from '../../libs/graphql/posts';
import WriteHeader from '../../components/write/WriteHeader';

export interface WriteHeaderProps {
  postId: string;
  category: string;
  title: string;
  thumbnail: string;
  body: string;
  tags: string[];
  setThumbnail: React.Dispatch<React.SetStateAction<string>>;
  setBody: React.Dispatch<React.SetStateAction<string>>;
  edit: boolean;
  post: PostType | null;
}

function WriteHeaderContainer({
  postId,
  category,
  title,
  thumbnail,
  body,
  tags,
  setThumbnail,
  setBody,
  edit,
  post,
}: WriteHeaderProps) {
  const client = useApolloClient();
  const router = useRouter();
  const [AddPost] = useMutation(ADD_POST);
  const [UpdatePost] = useMutation(UPDATE_POST);

  const onBack = () => {
    router.back();
  };

  const onThumbnail = () => {
    const upload = document.createElement('input');

    upload.type = 'file';
    upload.onchange = async (e) => {
      if (!upload.files) return;

      const file = upload.files[0];
      const formData = new FormData();

      formData.append('file', file);

      const response = await fetch(
        `${isProd ? prodServer : devServer}/upload/thumbnail`,
        {
          method: 'post',
          body: formData,
        }
      );

      if (!response) {
        toast.error('썸네일 업로드 간 에러 발생!');
        return;
      }

      const data = await response.json();

      setThumbnail(`https://image.dnkdream.com/${data.key}`);
    };

    upload.click();
  };

  const onUpload = () => {
    const upload = document.createElement('input');

    upload.type = 'file';
    upload.onchange = async (e) => {
      if (!upload.files) return;

      const file = upload.files[0];
      const formData = new FormData();

      formData.append('file', file);

      const response = await fetch(`${isProd ? prodServer : devServer}/upload`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      let oldBody = body;
      let newBody = `${oldBody}\n\n![](https://image.dnkdream.com/${data.key})`;

      setBody(newBody);
    };

    upload.click();
  };

  const onSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();

    if ([category, title, body, tags].includes('')) {
      toast.error('빈 내용이 없이 입력하세요');
      return;
    }

    try {
      if (!edit) {
        const response = await AddPost({
          variables: {
            category,
            title,
            body,
            tags,
            thumbnail,
          },
        });

        if (!response || !response.data) return;

        toast.success('포스트 저장 완료!');

        await client.clearStore();
        router.push(`/post/${response.data.AddPost.post.id}`);
      } else {
        const response = await UpdatePost({
          variables: {
            id: postId,
            category,
            title,
            body,
            tags,
            thumbnail,
          },
        });

        if (!response || !response.data) return;

        toast.success('포스트 저장 완료!');

        await client.clearStore();
        router.replace(`/post/${postId}`);
      }
    } catch (err) {
      toast.error(err);
    }
  };

  return (
    <WriteHeader
      onBack={onBack}
      onThumbnail={onThumbnail}
      onUpload={onUpload}
      onSubmit={onSubmit}
    />
  );
}

export default WriteHeaderContainer;
