import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { CHECK_ME } from '../graphql/auth';
import { MeType } from '../types';

function useAuth() {
  const router = useRouter();
  const { data, loading } = useQuery<{ CheckMe: { me: MeType | null } }>(CHECK_ME);

  useEffect(() => {
    if (!loading && !data?.CheckMe.me) {
      router.replace('/login');
    }
  }, [loading, data, router]);
}

export default useAuth;
