import React, {FC} from 'react';
import styles from './order-list.module.css';

interface IOrderList {
  heading: string;
  items: number[];
}

const OrderList: FC<IOrderList> = ({heading, items}) => {
  return (
    <div className={styles.list}>
      <h3 className="text text_type_main-medium mb-6">{heading}</h3>
      <ul className={styles.list + " custom-scroll"}>
        {items.map((itemNumber: number) => <li key={itemNumber} className={styles.item + " text text_type_digits-default mb-2"}>{itemNumber}</li>)}
      </ul>
    </div>
  );
} 

export default OrderList;
