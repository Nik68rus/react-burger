import {
  ConstructorElement,
  CurrencyIcon,
  Button
} from '@ya.praktikum/react-developer-burger-ui-components';
import React, {useState} from 'react';
import styles from './burger-constructor.module.css';
import {useDispatch, useSelector} from 'react-redux';
import { ADD_TO_CART, SET_CART, makeOrder, ORDER_RESET } from '../../services/actions/ingredient';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import Notification from '../notification/notification';
import { useDrop } from 'react-dnd';
import { SET_MESSAGE } from '../../services/actions/app';
import BurgerPart from '../burger-part/burger-part';

const BurgerConstructor = () => {
  const [orderVisible, setOrderVisible] = useState(false);
  const dispatch = useDispatch();
  const cart = useSelector(store => store.ingredient.cart);
  const order = useSelector(store => store.ingredient.order);
  const notification = useSelector(store => store.app.message);

  const showNotification = (message, duration = 3000) => {
    dispatch({type: SET_MESSAGE, payload: message});
    setTimeout(() => {
      dispatch({type: SET_MESSAGE, payload: ''});
    }, duration);
  };

  const [, dropTarget] = useDrop({
    accept: 'ingredient',
    drop(item) {
      dispatch({type: ADD_TO_CART, payload: item})
      if (item.type === 'bun' && cart.findIndex(item => item.type === 'bun') >= 0) {
        showNotification('В бургере может быть только один вид булок! Мы обновили ваш выбор.');
      }
    }
  })

  const [,partDropTarget] = useDrop({
    accept: 'burger-part',
  });

  const bun = cart.find(el => el.type === 'bun');
  const totalAmount = cart.reduce((acc, ingredient) => acc + ingredient.price, bun ? bun.price : 0);

  const onOrder = () => {
    const data = { ingredients: cart.map(item => item._id) };
    const bunIndex = cart.findIndex(item => item.type === 'bun');
    const burgerInner = cart.filter(item => item.type !== 'bun');

    if (bunIndex >= 0 && burgerInner.length > 0) {
      dispatch(makeOrder(data));
      setOrderVisible(true);
    } 
    if (bunIndex < 0) {
      showNotification('Не бывает бургеров без булки! Выберите булку!');
    }
    if (burgerInner.length === 0) {
      showNotification('Вы забыли выбрать начинку!')
    }
  } 

  const orderCloseHandler = () => {
    setOrderVisible(false);
    dispatch({type: ORDER_RESET});
  };

  const partMoveHandler = (oldIndex, newIndex) => {
    const newCart = [...cart];
    [newCart[oldIndex], newCart[newIndex]] = [newCart[newIndex], newCart[oldIndex]];
    dispatch({type: SET_CART, payload: newCart});
  }

  const findIndex = (ingredient) => cart.findIndex(item => item._id === ingredient._id);

  return (
    <>
      <section className={styles.constructor + ' pt-25'} ref={dropTarget}>
        <div className={styles.top + ' ml-10 mb-4 pl-4'}>{bun &&<ConstructorElement type="top" isLocked={true} text={bun.name + ' (верх)'} price={bun.price} thumbnail={bun.image}/>}</div>
        <ul className={styles.content + ' mb-4 custom-scroll pl-4 pr-1'} ref={partDropTarget}>
          {
            cart.map((el, i) => el.type === 'bun' ? null : <BurgerPart key={i} index={i} ingredient={el} onMove={partMoveHandler} findIndex={findIndex}/>)
          }
        </ul>
        <div className={styles.bottom + ' ml-10 mb-10 pl-4'}>
          {bun && <ConstructorElement type="bottom" isLocked={true} text={bun.name + ' (низ)'} price={bun.price} thumbnail={bun.image}/>}
        </div>

        {cart.length ? 
          <div className={styles.summary}>
            <span className={styles.value + " text text_type_digits-medium mr-10"}>
              {totalAmount}
              <CurrencyIcon type="primary" />
            </span>
            <Button type="primary" size="large" className="ml-10" onClick={onOrder}>
              Оформить заказ
            </Button>
          </div> : null
        }
      </section>
      {order.success && orderVisible && (
        <Modal onClose={orderCloseHandler}>
          <OrderDetails id={order.order.number} />
        </Modal>
      )}
      <Notification message={notification} />
    </>
  );
};

export default BurgerConstructor;
