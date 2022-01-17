import React, {useEffect} from 'react';
import Layout from './layout';
import {DndProvider} from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';
import {useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';

import BurgerIngredients from '../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../components/burger-constructor/burger-constructor';
import { SET_INGREDIENT } from '../services/actions/ingredient';

const HomePage = () => {  
  const {id} = useParams();
  const dispatch = useDispatch();
  const list = useSelector(store => store.ingredient.list);
  const item = list.find(ing => ing._id === id);
  const ingredientsLoaded = useSelector(store => store.ingredient.ingredientsLoaded);

  useEffect(() => {
    if (ingredientsLoaded && item) {
      dispatch({type: SET_INGREDIENT, payload: {...item, modal: true}})
    }
  }, [dispatch, item, ingredientsLoaded]);

  return (
    <Layout>
      <div className={'wrapper container'}>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients />
          <BurgerConstructor />
        </DndProvider>
      </div>
    </Layout>
  );
}

export default HomePage;
