import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import IngredientDetails from '../components/ingredient-details/ingredient-details';
import Page404 from '../components/page-404/page-404';
import { setIngredient } from '../services/actions';
import { TItem } from '../types';
import Layout from './layout';

const IngredientPage = () => {
  const {id} = useParams<{id: string}>();
  const item = useSelector((store: any) => store.ingredient.list.find((ing: TItem) => ing._id === id));
  const dispatch = useDispatch();

  useEffect(() => {
    if (item) {
      dispatch(setIngredient(item))
    }
  }, [item, dispatch]);

  return (
    <Layout>
      <div className="mt-20">
        {item ? <IngredientDetails /> : <Page404 />}
      </div>
    </Layout>
  );
}

export default IngredientPage;
