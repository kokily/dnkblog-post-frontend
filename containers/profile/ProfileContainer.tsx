import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { CHECK_ME, UPDATE_PROFILE } from '../../libs/graphql/auth';
import { MeType, CountType } from '../../libs/types';
import { COUNT_COMMENTS } from '../../libs/graphql/comments';
import { toast } from 'react-toastify';
import { devServer, isProd, prodServer } from '../../libs/constants';
import Profile from '../../components/profile/Profile';

function ProfileContainer() {
  const { data, loading, refetch } = useQuery<{ CheckMe: { user: MeType | null } }>(
    CHECK_ME
  );
  const { data: count, loading: countLoading } = useQuery<{
    CountComments: { count: CountType | null };
  }>(COUNT_COMMENTS);
  const [profile, setProfile] = useState(data?.CheckMe.user.profile);
  const [email, setEmail] = useState(data?.CheckMe.user.email);
  const [toggle, setToggle] = useState(false);
  const [UpdateProfile, { client }] = useMutation(UPDATE_PROFILE);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onProfileUpload = () => {
    const upload = document.createElement('input');

    upload.type = 'file';
    upload.onchange = async (e) => {
      if (!upload.files) return;

      const file = upload.files[0];
      const formData = new FormData();

      formData.append('file', file);

      const response = await fetch(`${isProd ? prodServer : devServer}/upload`, {
        method: 'post',
        body: formData,
      });

      const data = await response.json();
      setProfile(`https://image.dnkdream.com/${data.key}`);
    };

    upload.click();
  };

  const onToggle = () => {
    setToggle(!toggle);
  };

  const onSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();

    console.log(profile, data?.CheckMe.user.profile, email, data?.CheckMe.user.email);

    if (profile === data?.CheckMe.user.profile && email === data?.CheckMe.user.email) {
      toast.error('수정 사항이 없습니다.');
      return;
    }

    try {
      const response = await UpdateProfile({
        variables: {
          profile,
          email,
        },
      });

      if (response.data.UpdateProfile.error) {
        toast.error(response.data.UpdateProfile.error);
        return;
      } else {
        if (!response || !response.data) return;

        toast.success('프로필 수정 완료');
        await client.clearStore();
        setToggle(false);
        await refetch();
      }
    } catch (err) {
      toast.error(err);
    }
  };

  useEffect(() => {}, [profile]);

  if (loading) return null;
  if (countLoading) return null;

  return (
    <Profile
      user={data?.CheckMe.user}
      email={email}
      profile={profile}
      onChange={onChange}
      onProfileUpload={onProfileUpload}
      toggle={toggle}
      onToggle={onToggle}
      onSubmit={onSubmit}
      count={count?.CountComments.count || null}
    />
  );
}

export default ProfileContainer;
