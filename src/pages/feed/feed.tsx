import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { getFeedThunk } from '../../services/slices/feedSlice/feedSlice';
import {
  AppDispatch,
  RootState,
  useDispatch,
  useSelector
} from '../../services/store';

export const Feed: FC = () => {
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(getFeedThunk());
  }, [dispatch]);
  const orders: TOrder[] = [];

  const feedState = useSelector((state: RootState) => state.feed);
  const handleGetFeeds = () => {
    dispatch(getFeedThunk());
  };
  return (
    <>
      {feedState.isLoading ? (
        <Preloader />
      ) : (
        <FeedUI
          orders={feedState.data.orders}
          handleGetFeeds={handleGetFeeds}
        />
      )}
    </>
  );
};
