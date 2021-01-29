import React from 'react';
import { useQuery } from '@apollo/client';
import { useTransition } from 'react-spring';
import { DIVIDE_CATEGORY } from '../../../libs/graphql/categories';
import { CategoryType, MeType } from '../../../libs/types';
import UserMenu from '../../../components/common/menu/UserMenu';

interface UserMenuProps {
  user: MeType | null;
  onClose: (e: React.MouseEvent) => void;
  onLogout: () => void;
  visible: boolean;
}

function UserMenuContainer({ user, onClose, onLogout, visible }: UserMenuProps) {
  const { data, loading, error } = useQuery<{
    DivideCategory: { categories: CategoryType[] | null };
  }>(DIVIDE_CATEGORY);
  const transition = useTransition(visible, null, {
    from: {
      opacity: 0,
      transform: 'scale(0.5)',
    },
    enter: {
      opacity: 1,
      transform: 'scale(1)',
    },
    leave: {
      opacity: 0,
      transform: 'scale(0.5)',
    },
    config: {
      tension: 400,
      friction: 26,
    },
  });

  if (loading) return null;
  if (error) return null;

  return (
    <UserMenu
      user={user}
      onClose={onClose}
      onLogout={onLogout}
      transition={transition}
      categories={data?.DivideCategory.categories || null}
    />
  );
}

export default UserMenuContainer;
