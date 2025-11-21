import { FC, useEffect } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useParams } from 'react-router-dom';
import { AppDispatch, RootState, useSelector } from '../../services/store';
import { useDispatch } from 'react-redux';
import { getIngredientThunk } from '../../services/slices/ingredientsSlice/ingredientsSlice';
import { TIngredient } from '@utils-types';

export const IngredientDetails: FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredientThunk());
  }, []);

  const ingredients: TIngredient[] = useSelector(
    (state: RootState) => state.ingredients.data
  );
  const ingredientData = ingredients.find((item) => item._id === id);

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
