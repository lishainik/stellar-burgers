import { getIngredientsApi } from '@api';
import {
  createAsyncThunk,
  createSlice,
  SerializedError
} from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

type TIngredientsState = {
  isLoading: boolean;
  error: null | SerializedError;
  data: TIngredient[];
};

const initialState: TIngredientsState = {
  isLoading: true,
  error: null,
  data: []
};

export const getIngredientThunk = createAsyncThunk<TIngredient[], void>(
  'ingredients/getIngerdient',
  async (): Promise<TIngredient[]> => await getIngredientsApi()
);

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getIngredientThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getIngredientThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.data = action.payload;
      })
      .addCase(getIngredientThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      });
  }
});

export default ingredientsSlice.reducer;
