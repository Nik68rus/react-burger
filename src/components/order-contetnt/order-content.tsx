import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React, {FC} from 'react';
import { TItem } from '../../types';
import { formatDate } from '../../utils/date';
import { useSelector } from '../../utils/hooks';
import OrderIngredient from '../order-ingredient/order-ingredient';
import styles from './order-content.module.css';

interface IOrderContent {
  _id: string;
  ingredients: string[];
  status: "created" | "pending" | "done";
  name: string;
  createdAt: Date;
  updatedAt: Date;
  number: number;
};

const Status = {
  done: 'Выполнен',
  created: 'Создан',
  pending: 'Готовится',
};

const OrderContent: FC<IOrderContent> = ({_id, ingredients, status, name, createdAt, number}) => {
  const {list} = useSelector(store => store.ingredient);

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
      <p className={styles.number + " text text_type_digits-default mb-10"}>#{number}</p>
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
