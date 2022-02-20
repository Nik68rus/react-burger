import {
  ConstructorElement,
  CurrencyIcon,
  Button
} from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import styles from './burger-constructor.module.css';
import {useDispatch, useSelector} from '../../utils/hooks';
import { makeOrder } from '../../services/actions/ingredient';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import Notification from '../notification/notification';
import { useDrop } from 'react-dnd';
import { showNotification } from '../../services/actions/app';
import BurgerPart from '../burger-part/burger-part';
import { useHistory } from 'react-router-dom';
import { Paths } from '../../utils/data';
import { addToCart, orderReset, setCart } from '../../services/actions';
import { TItem } from '../../types';
import { Loader } from '../loader/loader';

const BurgerConstructor = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const {cart, order} = useSelector((store: any) => store.ingredient);
  // const cart: string[] = useSelector(store => store.ingredient.cart);
  const isAuthorized = useSelector(store => store.user.isAuthorized);
  const {message: notification, locked} = useSelector(store => store.app);

  const [, dropTarget] = useDrop({
    accept: 'ingredient',
    drop(item: TItem) {
      dispatch(addToCart(item));
      if (item.type === 'bun' && cart.findIndex((item: TItem) => item.type === 'bun') >= 0) {
        dispatch(showNotification('В бургере может быть только один вид булок! Мы обновили ваш выбор.'));
      }
    }
  })

  const [,partDropTarget] = useDrop({
    accept: 'burger-part',
  });

  const bun = cart.find((el: TItem) => el.type === 'bun');
  const totalAmount = cart.reduce((acc: number, ingredient: TItem) => acc + ingredient.price, bun ? bun.price : 0);

  const onOrder = () => {
    const data = { ingredients: cart.map((item: TItem) => item._id) };
    const bunIndex = cart.findIndex((item: TItem) => item.type === 'bun');
    const burgerInner = cart.filter((item: TItem) => item.type !== 'bun');

    if (bunIndex >= 0 && burgerInner.length > 0 && isAuthorized) {
      dispatch(makeOrder(data));
    } 
    if (!isAuthorized) {
      history.replace({ pathname: Paths.LOGIN, state: { from: Paths.HOME } });
    }
    if (bunIndex < 0) {
      dispatch(showNotification('Не бывает бургеров без булки! Выберите булку!'));
    }
    if (burgerInner.length === 0) {
      dispatch(showNotification('Вы забыли выбрать начинку!'))
    }
  } 

  const orderCloseHandler = () => {
    dispatch(orderReset());
  };

  const partMoveHandler = (oldIndex: number, newIndex: number) => {
    const newCart = [...cart];
    [newCart[oldIndex], newCart[newIndex]] = [newCart[newIndex], newCart[oldIndex]];
    dispatch(setCart(newCart));
  }

  const findIndex = (ingredient: TItem) => cart.findIndex((item: TItem) => item._id === ingredient._id);
  const lockStyle = locked ? styles.locked : '';

  return (
    <>
      <section className={styles.constructor + ' pt-25 ' + lockStyle} ref={dropTarget}>
        {cart.length === 0 ? <p className={"text text_type_main-medium " + styles.empty}>Перетащите ингридиенты<br/>в эту область</p> : <>
          <div className={styles.top + ' ml-10 mb-4 pl-4'}>{bun &&<ConstructorElement type="top" isLocked={true} text={bun.name + ' (верх)'} price={bun.price} thumbnail={bun.image}/>}</div>
          <ul className={styles.content + ' mb-4 custom-scroll pl-4 pr-1'} ref={partDropTarget}>
            {
              cart.map((el: TItem, i: number) => el.type === 'bun' ? null : <BurgerPart key={i} index={i} ingredient={el} onMove={partMoveHandler} findIndex={findIndex}/>)
            }
          </ul>
          <div className={styles.bottom + ' ml-10 mb-10 pl-4'}>
            {bun && <ConstructorElement type="bottom" isLocked={true} text={bun.name + ' (низ)'} price={bun.price} thumbnail={bun.image}/>}
          </div>
          <div className={styles.summary}>
            <span className={styles.value + " text text_type_digits-medium mr-10"}>
              {totalAmount.toLocaleString('ru-RU')}
              <CurrencyIcon type="primary" />
            </span>
            <Button type="primary" size="large" onClick={onOrder}>
              {locked ? <Loader size='small' inverse/> : 'Оформить заказ'}
            </Button>
          </div>
        </>}
      </section>
      {order.success && (
        <Modal onClose={orderCloseHandler}>
          <OrderDetails id={order.order.number} />
        </Modal>
      )}
      <Notification message={notification} />
    </>
  );
};

export default BurgerConstructor;
