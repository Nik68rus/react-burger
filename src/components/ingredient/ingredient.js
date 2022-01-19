import React from 'react';
import styles from './ingredient.module.css';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { itemPropTypes } from '../../utils/prop-types';
import {useDispatch, useSelector} from 'react-redux';
import {useDrag} from 'react-dnd';
import {useHistory, useLocation, Link} from 'react-router-dom';
import { Paths } from '../../utils/data';
import { setIngredient } from '../../services/actions';

const Ingredient = ({item}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const cart = useSelector(store => store.ingredient.cart);

  const [, ingRef] = useDrag({
    type: 'ingredient',
    item,
  });

  let amount = cart.filter(cartItem => cartItem._id === item._id).length;
  amount = item.type === 'bun' && amount > 0 ? 2 : amount;

  const ingredientClickHandler = () => {
    dispatch(setIngredient(item));
    history.replace({ pathname: `${Paths.INGREDIENTS}/${item._id}`, state: { from: Paths.HOME } });
  }

  return (
    <Link to={{pathname: `${Paths.INGREDIENTS}/${item._id}`, state: {background: location}}} className={styles.ingredient + ' pl-4 pr-4'} onClick={ingredientClickHandler} ref={ingRef}>
      {(amount > 0) && <Counter count={amount} size="default" />}
      <img src={item.image} alt={item.name} />
      <div className={styles.price + ' text text_type_digits-default mt-1 mb-1'}>
        {item.price}
        <CurrencyIcon type="primary" />
      </div>
      <h4 className="text text_type_main-default">{item.name}</h4>
      
    </Link>
  );
}

Ingredient.propTypes = {
  item: itemPropTypes.isRequired,
}

export default Ingredient;
