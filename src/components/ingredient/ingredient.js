import React from 'react';
import styles from './ingredient.module.css';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { itemPropTypes } from '../../utils/prop-types';
import {useDispatch, useSelector} from 'react-redux';
import { SET_INGREDIENT } from '../../services/actions/ingredient';
import {useDrag} from 'react-dnd';

const Ingredient = ({item}) => {
  const dispatch = useDispatch();
  const cart = useSelector(store => store.ingredient.cart);

  const [, ingRef] = useDrag({
    type: 'ingredient',
    item,
  });

  let amount = cart.filter(cartItem => cartItem._id === item._id).length;
  amount = item.type === 'bun' && amount > 0 ? 2 : amount;

  const ingredientClickHandler = () => {
    dispatch({type: SET_INGREDIENT, payload: item})
  }

  return (
    <article className={styles.ingredient + ' pl-4 pr-4'} onClick={ingredientClickHandler} ref={ingRef}>
      {(amount > 0) && <Counter count={amount} size="default" />}
      <img src={item.image} alt={item.name} />
      <div className={styles.price + ' text text_type_digits-default mt-1 mb-1'}>
        {item.price}
        <CurrencyIcon type="primary" />
      </div>
      <h4 className="text text_type_main-default">{item.name}</h4>
      
    </article>
  );
}

Ingredient.propTypes = {
  item: itemPropTypes.isRequired,
}

export default Ingredient;
