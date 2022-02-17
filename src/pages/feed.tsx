import React from 'react';
import Layout from './layout';
import styles from './feed.module.css';
import { useSelector } from '../utils/hooks';
import FeedItem from '../components/feed-item/feed-item';
import { TFeedItem } from '../types';
import OrderList from '../components/order-list/order-list';
import Figure from '../components/figure/figure';

const FeedPage = () => {
  const {orders, total, totalToday} = useSelector(store => store.ws.feed);

  const ordersDone = orders ? orders.filter((order: TFeedItem) => order.status === 'done').map((order: TFeedItem) => order.number).slice(0, 5) : [];
  const ordersInProgress = orders ? orders.filter((order: TFeedItem) => order.status === 'created' || order.status === 'pending').map((order: TFeedItem) => order.number) : [];
  
  return (
    <Layout>
      <section className={styles.feed + " wrapper container mt-10"}>
        <h2 className="text text_type_main-large mb-5">Лента заказов</h2>
        <div className={styles.content}>
        <div className={styles.orders + " custom-scroll mr-15 pr-4"}>
          {
            orders && orders.length && orders.map((order: TFeedItem, i: number) => <FeedItem key={i} order={order} />)
          }
        </div>
        <div className={styles.stats}>
          <div className={styles.state + " mb-15"}>
            <OrderList heading='Готовы:' items={ordersDone}/>
            <OrderList heading='В работе:' items={ordersInProgress}/>
          </div>
          <div className={styles.figures}>
            <Figure label="Выполнено за все время:" value={total} />
            <Figure label="Выполнено за сегодня:" value={totalToday} />
          </div>
        </div>
        </div>
      </section>
    </Layout>
  );
}

export default FeedPage;
