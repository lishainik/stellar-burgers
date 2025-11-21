import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch, RootState, useSelector } from '../../services/store';
import { getOrdersThunk } from '../../services/slices/orderSlice/orderSlice';

export const ProfileOrders: FC = () => {
  const dispatch: AppDispatch = useDispatch();

  const { data: orders } = useSelector((state: RootState) => state.order);

  useEffect(() => {
    dispatch(getOrdersThunk());
  }, [dispatch]);

  return <ProfileOrdersUI orders={orders} />;
};
