import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from '../../services/store';

export const AppHeader: FC = () => {
  const userData = useSelector((state) => state.user);

  return <AppHeaderUI userName={userData.data.name} />;
};
