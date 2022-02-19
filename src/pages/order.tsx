import React, {FC, useMemo } from 'react';
import { useSelector } from '../utils/hooks';
import { useParams } from 'react-router-dom';
import OrderContent from '../components/order-contetnt/order-content';
import Layout from './layout';
import type { TFeedItem } from '../types';
import Page404 from '../components/page-404/page-404';
import { Loader } from '../components/loader/loader';

interface IOrderPage {
  privateRoute?: boolean;
};

const OrderPage: FC<IOrderPage> = ({privateRoute}) => {
  const {id} = useParams<{id: string}>();
  const {orders} = useSelector(store => store.ws.feed);
  const {orders: orderHistory} = useSelector(store => store.ws.orderHistory);  

  const orderIndex = useMemo(() => {
    if (privateRoute && orderHistory && orderHistory.length) {
      return orderHistory.map((order: TFeedItem) => order._id).findIndex((orderId: string) => orderId === id)
    };
    if (!privateRoute && orders && orders.length) {
      return orders.map((order: TFeedItem) => order._id).findIndex((orderId: string) => orderId === id)
    }
  }, [orders, orderHistory, id, privateRoute]);

  let content;

  if (!privateRoute && orders && orders.length && orderIndex >=0) {
    content = <OrderContent />
  }

  if (privateRoute && orderHistory && orderHistory.length && orderIndex >=0) {
    content = <OrderContent />
  }

  if (!privateRoute && orders && orders.length && orderIndex < 0) {
    content = <Page404 />
  }

  if (privateRoute && orderHistory && orderHistory.length && orderIndex < 0) {
    content = <Page404 />
  }

  if (!privateRoute && (!orders || !orders.length)) {
    content = <Loader size="large" />
  }  

  if (privateRoute && (!orderHistory || !orderHistory.length)) {
    content = <Loader size="large" />
  }

  console.log(id);
  console.log(orderIndex);
  
  
  

  return (
    <Layout>
      <div className="mt-20">
        {content}
      </div>
    </Layout>
  );
}

export default OrderPage;
