import feedReducer, {
  initialState,
  getFeedThunk
} from '../services/slices/feedSlice/feedSlice';

const feedsMockData = {
  orders: [],
  total: 1,
  totalToday: 1
};

describe('тестирования слайсера ленты заказов', () => {
  describe('getFeedsThunk', () => {
    test('pending', () => {
      const state = feedReducer(initialState, getFeedThunk.pending('pending'));
      expect(state.isLoading).toBeTruthy();
      expect(state.error).toBeNull();
    });

    test('fulfilled', () => {
      const state = feedReducer(
        initialState,
        getFeedThunk.fulfilled(feedsMockData, 'fulfilled')
      );
      expect(state.isLoading).toBeFalsy();
      expect(state.error).toBeNull();
      expect(state.data).toEqual(feedsMockData);
    });
    test('rejected', () => {
      const state = feedReducer(
        initialState,
        getFeedThunk.rejected(new Error('error'), 'rejected')
      );
      expect(state.isLoading).toBeFalsy();
      expect(state.error?.message).toEqual('error');
    });
  });
});
