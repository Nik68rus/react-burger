import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import { useParams } from 'react-router-dom';
import { TFeedItem, TItem } from '../../types';
import { formatDate } from '../../utils/date';
import { useSelector } from '../../utils/hooks';
import OrderIngredient from '../order-ingredient/order-ingredient';
import styles from './order-content.module.css';

const Status = {
  done: 'Выполнен',
  created: 'Создан',
  pending: 'Готовится',
};

const OrderContent = () => {
  const {id} = useParams<{id: string}>();
  const {orders} = useSelector(store => store.ws.feed);
  const {orders: orderHistory} = useSelector(store => store.ws.orderHistory);  
  const {list} = useSelector(store => store.ingredient);
  
  let allOrders = [];

  if (orders && orders.length) {
    allOrders = orders.concat(orderHistory);
  }

  if (orderHistory && orderHistory.length) {
    allOrders = orders.concat(orderHistory);
  }

  const item: TFeedItem = allOrders.find((order: TFeedItem) => order._id === id);

  if (!item) {
    return null;
  }

  const {ingredients, status, name, createdAt, number} = item;

  const uniqIngredients = [...new Set(ingredients)];

  const ingredientsData = uniqIngredients.map((id: string) => {
    const ing: TItem & {count: number} = {...list.find(item => item._id === id)!, count: 0};
    ingredients.forEach(item => {
      if (ing._id === item) {
        ing.count++;
      }
    });
    ing.count = ing.type === 'bun' ? 2 : ing.count;
    return ing;
  })
  
  return (
    <article className={styles.order}>
      <p className={styles.number + " text text_type_digits-default mb-10 "}>#{number}</p>
      <h2 className="text text_type_main-medium mb-3">{name}</h2>
      <p className={styles.status + " text text_type_main-default mb-15"}>{Status[status]}</p>
      <p className="text text_type_main-medium mb-6">Состав:</p>
      <div className={styles.content + " custom-scroll pr-8 mb-10"}>
        {
          ingredientsData.map(ing => <OrderIngredient key={ing._id} image={ing.image} name={ing.name} count={ing.count} price={ing.price} /> )
        }
      </div>
      <div className={styles.footer}>
        <span className={styles.date + " text text_type_main-default"}>{formatDate(new Date(createdAt))}</span>
        <span className={styles.total + " ml-4 text text_type_digits-default"}>{ingredientsData.reduce((acc, ing) => acc + ing.price*ing.count, 0).toLocaleString('ru-RU')} <CurrencyIcon type='primary' /></span>
      </div>
    </article>
  )
};

export default OrderContent;
