import React, { FC } from 'react';
import { useSelector } from '../../utils/hooks';
import { TFeedItem } from '../../types';
import styles from './feed-item.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Ingredients from '../ingredients/ingredients';
import {Link, useLocation} from 'react-router-dom';
// import { Paths } from '../../utils/data';
import { formatDate } from '../../utils/date';
import { Status } from '../../utils/data';

interface IFeedItem {
  order: TFeedItem;
  showStatus? : boolean;
}

const FeedItem: FC<IFeedItem> = ({ order, showStatus }) => {
  const date = new Date(order.createdAt);
  const { list } = useSelector((store) => store.ingredient);
  const location = useLocation();

  

  const getPrice = (burger: string[]) => {
    return burger.reduce((acc: number, id: string) => {
      const item = list.find((ing) => ing._id === id);
      return (acc += item
        ? item.type === 'bun'
          ? item.price * 2
          : item.price
        : 0);
    }, 0);
  };

  const getPictures = (burger: string[]) => {
    const pictures: string[] = [];
    burger.forEach(id => {
      const curIng = list.find(ingredient => ingredient._id === id);
      if (curIng) {
        pictures.push(curIng.image);
      }
    });    
    return pictures;
  }

  return (
    <article className={styles.feedItem + ' p-6 mb-6'}>
      <Link to={{pathname: `${location.pathname}/${order._id}`, state: {background: location, modal: 'order', from: location.pathname}}}>
        <div className={styles.header + ' mb-6'}>
          <span className="text text_type_digits-default">#{order.number}</span>
          <span className={styles.date + " text text_type_main-default"}>
            {formatDate(date)}
          </span>
        </div>
        <h3 className="text text_type_main-medium mb-2">{order.name}</h3>
        {showStatus && <div className="text text_type_main-default">{Status[order.status]}</div>}
        <div className={styles.footer + " mt-6"}>
          <Ingredients list={getPictures(order.ingredients)} />
          <div className={styles.price + " text text_type_digits-default"}>{getPrice(order.ingredients).toLocaleString('ru-RU')} <CurrencyIcon type='primary'/></div>
        </div>
      </Link>
    </article>
  );
};

export default FeedItem;
