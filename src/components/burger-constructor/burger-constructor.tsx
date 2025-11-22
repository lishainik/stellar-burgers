import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useSelector, useDispatch } from '../../services/store';
import { useNavigate } from 'react-router-dom';
import {
  createOrderThunk,
  resetModal
} from '../../services/slices/orderSlice/orderSlice';
import { resetConstructor } from '../../services/slices/constructorSlice/constructorSlice';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let constructorItems = useSelector((state) => state.burgerConstructor);

  const userData = useSelector((state) => state.user);

  if (!constructorItems.bun) {
    constructorItems = {
      bun: {
        _id: '',
        name: '',
        type: '',
        proteins: 0,
        fat: 0,
        carbohydrates: 0,
        calories: 0,
        price: 0,
        image: '',
        image_large: '',
        image_mobile: ''
      },
      ingredients: constructorItems.ingredients
    };
  }

  const orderData = useSelector((state) => state.order);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderData.orderRequest) return;
    if (!userData.isAuth) {
      return navigate('/login');
    }
    const data = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map((item) => item._id),
      constructorItems.bun._id
    ];
    dispatch(createOrderThunk(data));
    dispatch(resetConstructor());
  };

  const closeOrderModal = () => {
    dispatch(resetModal());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderData.orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderData.orderModal}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
