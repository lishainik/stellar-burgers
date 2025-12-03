import constructorReducer, {
  addBun,
  addIngredient,
  removeIngredient,
  moveUpIngredient,
  moveDownIngredient,
  resetConstructor,
  initialState
} from '../services/slices/constructorSlice/constructorSlice';


const bunMockData = {
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
};

const ingredient1MockData = {
  _id: '643d69a5c3f7b9001cfa093e',
  id: '1234567890',
  name: 'Филе Люминесцентного тетраодонтимформа',
  type: 'main',
  proteins: 44,
  fat: 26,
  carbohydrates: 85,
  calories: 643,
  price: 988,
  image: 'https://code.s3.yandex.net/react/code/meat-03.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
  __v: 0
};

const ingredient2MockData = {
  _id: '643d69a5c3f7b9001cfa093e',
  id: '9876543210',
  name: 'Филе Люминесцентного тетраодонтимформа',
  type: 'main',
  proteins: 44,
  fat: 26,
  carbohydrates: 85,
  calories: 643,
  price: 988,
  image: 'https://code.s3.yandex.net/react/code/meat-03.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
  __v: 0
};

describe('тестирования слайса конструктора бургеров', () => {
  describe('добавление булки', () => {
    test('addBun', () => {
      const state = constructorReducer(initialState, addBun(bunMockData));
      expect(state.bun).toEqual(bunMockData);
      expect(state.ingredients).toHaveLength(0);
    });
  });
});

describe('добавление ингредиента', () => {
  test('addIngredient', () => {
    const state = constructorReducer(
      initialState,
      addIngredient(ingredient1MockData)
    );
    expect(state.ingredients).toHaveLength(1);

    const updatedObj = { ...state.ingredients[0] } as Record<string, any>;
    delete updatedObj['id'];

    const initialObj = { ...ingredient1MockData } as Record<string, any>;
    delete initialObj['id'];

    expect(updatedObj).toEqual(initialObj);
    expect(state.bun).toBeNull();
  });
});

describe('удаление ингредиента', () => {
  test('removeIngredient', () => {
    const _initialState = {
      bun: null,
      ingredients: [ingredient1MockData, ingredient2MockData]
    };
    const state = constructorReducer(
      _initialState,
      removeIngredient(ingredient1MockData)
    );
    expect(state.ingredients).toHaveLength(1);
    expect(state.ingredients[0]).toEqual(ingredient2MockData);
    expect(state.bun).toBeNull();
  });
});

describe('передвижение ингредиентов в конструкотре', () => {
  test('moveDownIngredient', () => {
    const _initialState = {
      bun: null,
      ingredients: [ingredient1MockData, ingredient2MockData]
    };
    const state = constructorReducer(_initialState, moveDownIngredient(0));
    expect(state.ingredients).toHaveLength(2);
    expect(state.ingredients[0]).toEqual(ingredient2MockData);
    expect(state.ingredients[1]).toEqual(ingredient1MockData);
    expect(state.bun).toBeNull();
  });

  test('moveUpIngredient', () => {
    const _initialState = {
      bun: null,
      ingredients: [ingredient1MockData, ingredient2MockData]
    };
    const state = constructorReducer(_initialState, moveUpIngredient(1));
    expect(state.ingredients).toHaveLength(2);
    expect(state.ingredients[0]).toEqual(ingredient2MockData);
    expect(state.ingredients[1]).toEqual(ingredient1MockData);
    expect(state.bun).toBeNull();
  });
});

describe('очистка конструктора', () => {
  test('resetConstructor', () => {
    const _initialState = {
      bun: bunMockData,
      ingredients: [ingredient1MockData, ingredient2MockData]
    };

    const state = constructorReducer(_initialState, resetConstructor());
    expect(state.ingredients).toHaveLength(0);
    expect(state.bun).toBeNull();
  });
});
