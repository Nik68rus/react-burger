import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import IngredientDetails from '../components/ingredient-details/ingredient-details';
import Page404 from '../components/page-404/page-404';
import { SET_INGREDIENT } from '../services/actions/ingredient';
import Layout from './layout';

const IngredientPage = () => {
  const {id} = useParams();
  const item = useSelector(store => store.ingredient.list.find(ing => ing._id === id));
  const dispatch = useDispatch();

  useEffect(() => {
    if (item) {
      dispatch({type: SET_INGREDIENT, payload: {...item, modal: false}})
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