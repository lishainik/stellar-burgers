import { rootReducer, store } from '../services/store';

describe('тестирование редьюмера слайсов', () => {
  test('rootreducer init', () => {
    const init = store.getState();
    const afterInit = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });
    expect(afterInit).toEqual(init);
  });
});
