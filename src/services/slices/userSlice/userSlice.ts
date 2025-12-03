import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '@api';
import {
  createAsyncThunk,
  createSlice,
  SerializedError
} from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { log } from 'console';
import { deleteCookie, setCookie } from '../../../utils/cookie';

type TUserState = {
  isAuth: boolean;
  data: TUser;
  loginUserRequest: boolean;
  error?: SerializedError;
};

const initialState: TUserState = {
  isAuth: false,
  data: {
    name: '',
    email: ''
  },
  loginUserRequest: false
};

export const getUserThunk = createAsyncThunk<TUser>(
  'user/getUser',
  async (_, { rejectWithValue }) => {
    const res = await getUserApi();
    if (!res?.success) {
      return rejectWithValue(res);
    }
    return res.user;
  }
);

export const registerUserThunk = createAsyncThunk<TUser, TRegisterData>(
  'user/register',
  async (data, { rejectWithValue }) => {
    const res = await registerUserApi(data);
    if (!res?.success) {
      return rejectWithValue(res);
    }
    const { user, refreshToken, accessToken } = res;
    setCookie('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    return user;
  }
);

export const loginUserThunk = createAsyncThunk<TUser, TLoginData>(
  'user/login',
  async (data, { rejectWithValue }) => {
    const res = await loginUserApi(data);
    if (!res?.success) {
      return rejectWithValue(res);
    }
    const { user, refreshToken, accessToken } = res;
    setCookie('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    return user;
  }
);

export const updateUserThunk = createAsyncThunk<TUser, Partial<TRegisterData>>(
  'user/update',
  async (data, { rejectWithValue }) => {
    const res = await updateUserApi(data);
    if (!res?.success) {
      return rejectWithValue(res);
    }
    return res.user;
  }
);

export const logoutUserThunk = createAsyncThunk(
  'user/logoutUser',
  async (_, { rejectWithValue }) => {
    const res = await logoutApi();
    if (!res?.success) {
      return rejectWithValue(res);
    }
    deleteCookie('accessToken');
    localStorage.removeItem('refreshToken');
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUserThunk.pending, (state) => {
        state.error = undefined;
      })
      .addCase(registerUserThunk.fulfilled, (state, action) => {
        state.error = undefined;
        state.isAuth = true;
        state.data = action.payload;
      })
      .addCase(registerUserThunk.rejected, (state, action) => {
        state.error = action.meta.rejectedWithValue
          ? (action.payload as SerializedError)
          : action.error;
      })
      .addCase(loginUserThunk.pending, (state) => {
        state.error = undefined;
      })
      .addCase(loginUserThunk.fulfilled, (state, action) => {
        state.error = undefined;
        state.isAuth = true;
        state.data = action.payload;
      })
      .addCase(loginUserThunk.rejected, (state, action) => {
        state.error = action.meta.rejectedWithValue
          ? (action.payload as SerializedError)
          : action.error;
      })
      .addCase(logoutUserThunk.fulfilled, (state) => {
        state.isAuth = false;
        state.data = {
          name: '',
          email: ''
        };
      })
      .addCase(getUserThunk.fulfilled, (state, action) => {
        state.isAuth = true;
        state.loginUserRequest = true;
        state.data = action.payload;
      })
      .addCase(getUserThunk.rejected, (state, action) => {
        state.loginUserRequest = true;
      })
      .addCase(updateUserThunk.fulfilled, (state, action) => {
        state.data = action.payload;
      });
  }
});

export default userSlice.reducer;
