import {
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
  Button
} from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import styles from './burger-constructor.module.css';
import PropTypes from 'prop-types';

const BurgerConstructor = ({cart, onOrder}) => {
  const totalAmount = cart.reduce((acc, ingridient) => acc + ingridient.price, 0);
  const bun = cart.find(el => el.type === 'bun');
  return (
    <section className={styles.constructor + ' pt-25'}>
      <div className={styles.top + ' ml-10 mb-4 pl-4 pr-3'}>
        <ConstructorElement type="top" isLocked={true} text={bun.name + ' (верх)'} price={bun.price} thumbnail={bun.image}/>
      </div>
      <ul className={styles.content + ' mb-4 custom-scroll pl-4 pr-1'}>
        {cart.filter(el => el.type !== 'bun').map((el, i) => {
          return (
            <li key={i} className={styles.item + ' mb-4'}>
              <button className="btn mr-4">
                <DragIcon type="primary" />
              </button>
              <ConstructorElement key={i} isLocked={true} text={el.name + ' (низ)'} price={el.price} thumbnail={el.image} />
            </li>
          );
        })}
      </ul>
      <div className={styles.bottom + ' ml-10 mb-10 pl-4 pr-3'}>
        <ConstructorElement type="bottom" isLocked={true} text={bun.name + ' (низ)'} price={bun.price} thumbnail={bun.image}/>
      </div>

      <div className={styles.summary}>
        <span className={styles.value + " text text_type_digits-medium mr-10"}>
          {totalAmount}
          <CurrencyIcon type="primary" />
        </span>
        <Button type="primary" size="large" className="ml-10" onClick={onOrder}>
          Оформить заказ
        </Button>
      </div>
    </section>
  );
};

BurgerConstructor.propTypes = {
  cart: PropTypes.arrayOf(
    PropTypes.shape({
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
      __v: PropTypes.number.isRequired0
    }).isRequired,
  ).isRequired,
  onOrder: PropTypes.func.isRequired,
}

export default BurgerConstructor;
