import ingredientsReducer, {
  getIngredientThunk,
  initialState
} from '../services/slices/ingredientsSlice/ingredientsSlice';

const ingredientsMockData = [
  {
    _id: '643d69a5c3f7b9001cfa093c',
    name: 'Краторная булка N-200i',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
    __v: 0
  }
];

describe('тестирование получения ингредиентов', () => {
  describe('getIngredientThunk', () => {
    test('pending', () => {
      const state = ingredientsReducer(
        initialState,
        getIngredientThunk.pending('pending')
      );

      expect(state.isLoading).toBeTruthy();
      expect(state.error).toBeNull();
    });
    test('fulfilled', () => {
      const state = ingredientsReducer(
        initialState,
        getIngredientThunk.fulfilled(ingredientsMockData, 'fulfilled')
      );

      expect(state.isLoading).toBeFalsy();
      expect(state.error).toBeNull();
      expect(state.data).toEqual(ingredientsMockData);
    });
  });
  test('rejected', () => {
    const state = ingredientsReducer(
      initialState,
      getIngredientThunk.rejected(new Error('error'), 'rejected')
    );

    expect(state.isLoading).toBeFalsy();
    expect(state.error?.message).toEqual('error');
  });
});
