import {
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
  Button
} from '@ya.praktikum/react-developer-burger-ui-components';
import React, {useContext} from 'react';
import styles from './burger-constructor.module.css';
import PropTypes from 'prop-types';
import { ConstructorContext } from '../../services/constructorContext';

const BurgerConstructor = ({onOrder}) => {
  const constructorContext = useContext(ConstructorContext);
  const {cartState} = constructorContext;
  const {cart} = cartState;
  const bun = cart.length ? cart.find(el => el.type === 'bun') : null;
  const correctedBurgerContent = cart.length ? cart.filter(ingredient => ingredient.type !== 'bun' || ingredient._id === bun._id) : [];
  // const totalAmount = cart.length ? correctedBurgerContent.reduce((acc, ingredient) => acc + ingredient.price, bun.price) : 0;
  const burgerInner = cart.length ? correctedBurgerContent.filter(el => el.type !== 'bun') : [];

  return (
    <section className={styles.constructor + ' pt-25'}>
      {bun ? <div className={styles.top + ' ml-10 mb-4 pl-4 pr-3'}><ConstructorElement type="top" isLocked={true} text={bun.name + ' (верх)'} price={bun.price} thumbnail={bun.image}/></div> : null}
      {burgerInner.length > 0 ? <ul className={styles.content + ' mb-4 custom-scroll pl-4 pr-1'}>
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
      </ul> : null}
      {bun ? <div className={styles.bottom + ' ml-10 mb-10 pl-4 pr-3'}>
        <ConstructorElement type="bottom" isLocked={true} text={bun.name + ' (низ)'} price={bun.price} thumbnail={bun.image}/>
      </div> : null}

      <div className={styles.summary}>
        <span className={styles.value + " text text_type_digits-medium mr-10"}>
          {cartState.total}
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
  onOrder: PropTypes.func.isRequired,
}

export default BurgerConstructor;
