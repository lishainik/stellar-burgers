import { FC, useState } from 'react';
import { RootState, useSelector } from '../../services/store';
import { Navigate, useLocation } from 'react-router-dom';
import { Preloader } from '@ui';

type ProtectedRouteProps = {
  children: React.ReactElement;
  onlyUnAuth?: boolean;
};

export const ProtectedRoute: FC<ProtectedRouteProps> = ({
  onlyUnAuth = false,
  children
}) => {
  const location = useLocation();
  const dataUser = useSelector((state: RootState) => state.user);

  if (!dataUser.loginUserRequest) {
    return <Preloader />;
  }

  if (onlyUnAuth && dataUser.data.email && dataUser.data.name) {
    const { from } = location.state || { from: { pathname: '/' } };
    return <Navigate to={from} />;
  }

  if (!onlyUnAuth && (!dataUser.data.email || !dataUser.data.name)) {
    return <Navigate to='/login' state={{ from: location }} />;
  }

  return children;
};
