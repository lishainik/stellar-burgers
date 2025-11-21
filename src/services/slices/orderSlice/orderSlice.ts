import {
  createAsyncThunk,
  createSlice,
  SerializedError
} from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getOrderByNumberApi, getOrdersApi, orderBurgerApi } from '@api';

type TOrderState = {
  isOrderLoading: boolean;
  areOrdersLoading: boolean;
  orderRequest: boolean;
  orderModal: TOrder | null;
  error: null | SerializedError;
  data: TOrder[];
};

export const initialState: TOrderState = {
  isOrderLoading: true,
  areOrdersLoading: true,
  orderRequest: false,
  error: null,
  orderModal: null,
  data: []
};

export const getOrdersThunk = createAsyncThunk<TOrder[]>(
  'order/getOrders',
  async (): Promise<TOrder[]> => await getOrdersApi()
);

export const getOrderThunk = createAsyncThunk<TOrder, number>(
  'order/getOrder',
  async (data, { rejectWithValue }) => {
    const res = await getOrderByNumberApi(data);
    if (!res?.success) {
      return rejectWithValue(res);
    }
    return res.orders[0];
  }
);

export const createOrderThunk = createAsyncThunk<
  {
    order: TOrder;
    name: string;
  },
  string[]
>('order/createOrder', async (data, { rejectWithValue }) => {
  const res = await orderBurgerApi(data);
  if (!res?.success) {
    return rejectWithValue(res);
  }
  return { order: res.order, name: res.name };
});

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    resetModal(state) {
      state.orderModal = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrderThunk.pending, (state) => {
        state.isOrderLoading = true;
      })
      .addCase(getOrderThunk.rejected, (state) => {
        state.isOrderLoading = false;
      })
      .addCase(getOrderThunk.fulfilled, (state, action) => {
        state.isOrderLoading = false;
        state.orderModal = action.payload;
      })
      .addCase(getOrdersThunk.pending, (state) => {
        state.areOrdersLoading = true;
        state.error = null;
      })
      .addCase(getOrdersThunk.fulfilled, (state, action) => {
        state.areOrdersLoading = false;
        state.error = null;
        state.data = action.payload;
      })
      .addCase(getOrdersThunk.rejected, (state, action) => {
        state.areOrdersLoading = false;
        state.error = action.error;
      })
      .addCase(createOrderThunk.pending, (state) => {
        state.orderRequest = true;
      })
      .addCase(createOrderThunk.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orderModal = action.payload.order;
      })
      .addCase(createOrderThunk.rejected, (state) => {
        state.orderRequest = false;
      });
  }
});

export const { resetModal } = orderSlice.actions;
export default orderSlice.reducer;
