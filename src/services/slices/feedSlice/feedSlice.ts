import { getFeedsApi } from '@api';
import {
  createAsyncThunk,
  createSlice,
  nanoid,
  SerializedError
} from '@reduxjs/toolkit';
import { TOrdersData } from '@utils-types';

type TFeedState = {
  isLoading: boolean;
  error: null | SerializedError;
  data: TOrdersData;
};

const initialState: TFeedState = {
  isLoading: true,
  error: null,
  data: {
    orders: [],
    total: NaN,
    totalToday: NaN
  }
};

export const getFeedThunk = createAsyncThunk<TOrdersData>(
  'feeed/getFeed',
  async (): Promise<TOrdersData> => await getFeedsApi()
);

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFeedThunk.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getFeedThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.data = action.payload;
      })
      .addCase(getFeedThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      });
  }
});

export default feedSlice.reducer;
