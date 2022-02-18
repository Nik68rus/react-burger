import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React, {FC} from 'react';
import styles from './order-ingredient.module.css';

interface IOrderIngredient {
  image: string;
  name: string;
  count: number;
  price: number;
}

const OrderIngredient: FC<IOrderIngredient> = ({image, name, count, price}) => {
  return (
    <div className={styles.ingredient + " mb-4"}>
      <div className={styles.image + " mr-4"}>
        <img src={image} alt={name} />
      </div>
      <div className={styles.name + " text text_type_main-default"}>{name}</div>
      <div className={styles.price + " ml-4 text text_type_digits-default"}>{count} x {price.toLocaleString('ru-RU')} <CurrencyIcon type='primary'/></div>
    </div>
  )
};

export default OrderIngredient;