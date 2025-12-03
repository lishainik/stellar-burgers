import orderReducer, {
  getOrderThunk,
  getOrdersThunk,
  createOrderThunk,
  resetModal,
  initialState
} from '../services/slices/orderSlice/orderSlice';

const ordersMockData = [
  {
    ingredients: [
      '643d69a5c3f7b9001cfa093d',
      '643d69a5c3f7b9001cfa0941',
      '643d69a5c3f7b9001cfa093d'
    ],
    _id: '6622337897ede0001d0666b5',
    status: 'done',
    name: 'TEST',
    createdAt: '2024-10-31T09:02:42.748Z',
    updatedAt: '2024-10-31T09:02:51.057Z',
    number: 38321
  }
];

describe('тестирование слайса заказов', () => {
  test('resetModal', () => {
    const _initialState = {
      isOrderLoading: true,
      areOrdersLoading: true,
      orderRequest: false,
      orderModal: ordersMockData[0],
      error: null,
      data: []
    };

    const state = orderReducer(_initialState, resetModal());
    expect(state.orderModal).toBeNull();
    expect(state.data).toHaveLength(0);
    expect(state.error).toBeNull();
    expect(state.areOrdersLoading).toBeTruthy();
    expect(state.isOrderLoading).toBeTruthy();
    expect(state.orderRequest).toBeFalsy();
  });

  describe('getOrdersThunk', () => {
    test('pending', () => {
      const state = orderReducer(
        initialState,
        getOrdersThunk.pending('pending')
      );
      expect(state.areOrdersLoading).toBeTruthy();
      expect(state.error).toBeNull();
    });
    test('fulfilled', () => {
      const state = orderReducer(
        initialState,
        getOrdersThunk.fulfilled(ordersMockData, 'fulfilled')
      );
      expect(state.areOrdersLoading).toBeFalsy();
      expect(state.error).toBeNull();
      expect(state.data).toEqual(ordersMockData);
    });
    test('rejected', () => {
      const state = orderReducer(
        initialState,
        getOrdersThunk.rejected(new Error('error'), 'rejected')
      );
      expect(state.areOrdersLoading).toBeFalsy();
      expect(state.error?.message).toEqual('error');
    });
  });

  describe('getOrderThunk - получение по номеру', () => {
    test('pending', () => {
      const state = orderReducer(
        initialState,
        getOrderThunk.pending('pending', ordersMockData[0].number)
      );
      expect(state.isOrderLoading).toBeTruthy();
    });
    test('fulfilled', () => {
      const state = orderReducer(
        initialState,
        getOrderThunk.fulfilled(
          ordersMockData[0],
          'fulfilled',
          ordersMockData[0].number
        )
      );
      expect(state.isOrderLoading).toBeFalsy();

      expect(state.orderModal).toEqual(ordersMockData[0]);
    });
    test('rejected', () => {
      const state = orderReducer(
        initialState,
        getOrderThunk.rejected(new Error('error'), 'rejected', -1)
      );
      expect(state.isOrderLoading).toBeFalsy();
    });
  });

  describe('createOrderThunk', () => {
    test('pending', () => {
      const state = orderReducer(
        initialState,
        createOrderThunk.pending('pending', ordersMockData[0].ingredients)
      );
      expect(state.orderRequest).toBeTruthy();
    });
    test('fulfilled', () => {
      const state = orderReducer(
        initialState,
        createOrderThunk.fulfilled(
          { order: ordersMockData[0], name: 'SampleName' },
          'fulfilled',
          ordersMockData[0].ingredients
        )
      );
      expect(state.orderRequest).toBeFalsy();

      expect(state.orderModal).toEqual(ordersMockData[0]);
    });
    test('rejected', () => {
      const state = orderReducer(
        initialState,
        createOrderThunk.rejected(new Error('error'), 'rejected', [])
      );
      expect(state.orderRequest).toBeFalsy();
    });
  });
});
