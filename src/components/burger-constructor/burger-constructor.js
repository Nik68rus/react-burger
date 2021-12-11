import {
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
  Button
} from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import styles from './burger-constructor.module.css';
import PropTypes from 'prop-types';
import { itemPropTypes } from '../../utils/prop-types';

const BurgerConstructor = ({cart, onOrder}) => {
  const totalAmount = cart.reduce((acc, ingredient) => acc + ingredient.price, 0);
  const bun = cart.find(el => el.type === 'bun');
  const burgerInner = cart.filter(el => el.type !== 'bun');

  return (
    <section className={styles.constructor + ' pt-25'}>
      <div className={styles.top + ' ml-10 mb-4 pl-4 pr-3'}>
        <ConstructorElement type="top" isLocked={true} text={bun.name + ' (верх)'} price={bun.price} thumbnail={bun.image}/>
      </div>
      <ul className={styles.content + ' mb-4 custom-scroll pl-4 pr-1'}>
        {burgerInner.map((el, i) => {
          return (
            <li key={i} className={styles.item + ' mb-4'}>
              <button className={styles.btn + " mr-4"}>
                <DragIcon type="primary" />
              </button>
              <ConstructorElement key={i} text={el.name} price={el.price} thumbnail={el.image} />
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
  cart: PropTypes.arrayOf(itemPropTypes).isRequired,
  onOrder: PropTypes.func.isRequired,
}

export default BurgerConstructor;
