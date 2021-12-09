import React from 'react';
import styles from './ingridient.module.css';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

const Ingridient = ({item, amount, onClick}) => {
  const ingridientClickHandler = (evt) => {
    evt.preventDefault();
    onClick(item);
  }
  return (
    <article className={styles.ingridient + ' pl-4 pr-4'} onClick={ingridientClickHandler}>
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

Ingridient.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    proteins: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
    calories: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    image_mobile: PropTypes.string.isRequired,
    image_large: PropTypes.string.isRequired,
    __v: PropTypes.number.isRequired,
  }).isRequired,
  amount: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default Ingridient;
