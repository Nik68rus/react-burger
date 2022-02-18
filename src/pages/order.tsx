import React from 'react';
import { useSelector } from '../utils/hooks';
import { useParams } from 'react-router-dom';
import OrderContent from '../components/order-contetnt/order-content';
import Layout from './layout';
import type { TFeedItem } from '../types';
import Page404 from '../components/page-404/page-404';

const OrderPage = () => {
  const {id} = useParams<{id: string}>();
  const {orders} = useSelector(store => store.ws.feed);
  const {orders: orderHistory} = useSelector(store => store.ws.orderHistory);  

  let item;
  let content;

  item = orders.find((order: TFeedItem) => order._id === id);
  
  if (!item) {
    item = orderHistory.find((order: TFeedItem) => order._id === id);
  }
  if (!item) {
    content = <Page404 />
  } else {
    content = <OrderContent {...item}/>
  }

  return (
    <Layout>
      <div className="mt-20">
        {content}
      </div>
    </Layout>
  );
}

export default OrderPage;
