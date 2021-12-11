import React from 'react';
import styles from './ingredient.module.css';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { itemPropTypes } from '../../utils/prop-types';

const Ingredient = ({item, amount, onClick}) => {
  const ingredientClickHandler = (evt) => {
    evt.preventDefault();
    onClick(item);
  }
  return (
    <article className={styles.ingredient + ' pl-4 pr-4'} onClick={ingredientClickHandler}>
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
  amount: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default Ingredient;
