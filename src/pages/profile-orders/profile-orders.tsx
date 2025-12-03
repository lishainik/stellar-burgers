import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import { getOrdersThunk } from '../../services/slices/orderSlice/orderSlice';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();

  const { data: orders } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(getOrdersThunk());
  }, [dispatch]);

  return <ProfileOrdersUI orders={orders} />;
};
