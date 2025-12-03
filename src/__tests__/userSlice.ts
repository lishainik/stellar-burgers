import { error } from 'console';
import userReducer, {
  getUserThunk,
  updateUserThunk,
  registerUserThunk,
  loginUserThunk,
  logoutUserThunk,
  initialState
} from '../services/slices/userSlice/userSlice';

const userMockData = {
  email: 'test@test.test',
  name: 'Testy'
};

const registerMockData = {
  email: 'test@test.test',
  name: 'Testy',
  password: '123'
};

const loginMockData = {
  email: 'test@test.test',
  password: '123'
};

describe('тестирование слайса пользователя', () => {
  describe('registerUserThunk', () => {
    test('pending', () => {
      const state = userReducer(
        initialState,
        registerUserThunk.pending('pending', registerMockData)
      );
      expect(state.error).toBeUndefined();
    });
    test('fullfiled', () => {
      const state = userReducer(
        initialState,
        registerUserThunk.fulfilled(userMockData, 'fulfilled', registerMockData)
      );
      expect(state.error).toBeUndefined();
      expect(state.data).toEqual(userMockData);
      expect(state.isAuth).toBeTruthy();
    });
    test('rejected', () => {
      const state = userReducer(
        initialState,
        registerUserThunk.rejected(
          new Error('error'),
          'rejected',
          registerMockData
        )
      );
      expect(state.error?.message).toEqual('error');
    });
  });
  describe('loginUserThunk', () => {
    test('pending', () => {
      const state = userReducer(
        initialState,
        loginUserThunk.pending('pending', loginMockData)
      );
      expect(state.error).toBeUndefined();
    });
    test('fullfiled', () => {
      const state = userReducer(
        initialState,
        loginUserThunk.fulfilled(userMockData, 'fulfilled', loginMockData)
      );
      expect(state.error).toBeUndefined();
      expect(state.data).toEqual(userMockData);
      expect(state.isAuth).toBeTruthy();
    });
    test('rejected', () => {
      const state = userReducer(
        initialState,
        loginUserThunk.rejected(new Error('error'), 'rejected', loginMockData)
      );
      expect(state.error?.message).toEqual('error');
    });
  });
  describe('logoutUserThunk', () => {
    test('fullfiled', () => {
      const state = userReducer(
        initialState,
        logoutUserThunk.fulfilled(undefined, 'fulfilled')
      );
      expect(state.data).toEqual({
        email: '',
        name: ''
      });
      expect(state.isAuth).toBeFalsy();
    });
  });
  describe('getUserThunk', () => {
    test('fullfiled', () => {
      const state = userReducer(
        initialState,
        getUserThunk.fulfilled(userMockData, 'fulfilled')
      );
      expect(state.data).toEqual(userMockData);
      expect(state.loginUserRequest).toBeTruthy();
      expect(state.isAuth).toBeTruthy();
    });
    test('rejected', () => {
      const state = userReducer(
        initialState,
        getUserThunk.rejected(new Error('error'), 'rejected')
      );
      expect(state.loginUserRequest).toBeTruthy();
      expect(state.isAuth).toBeFalsy();
    });
  });
  describe('updateUserThunk', () => {
    test('fulfilled', () => {
      const state = userReducer(
        initialState,
        updateUserThunk.fulfilled(userMockData, 'fulfilled', userMockData)
      );
      expect(state.data).toEqual(userMockData);
    });
  });
});
