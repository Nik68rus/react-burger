import React, { FC, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from '../utils/hooks';
import { useParams } from 'react-router-dom';
import OrderContent from '../components/order-contetnt/order-content';
import Layout from './layout';
import type { TFeedItem } from '../types';
import Page404 from '../components/page-404/page-404';
import { Loader } from '../components/loader/loader';
import {
  wsConnectionAuthClose,
  wsConnectionAuthStart,
  wsConnectionClose,
  wsConnectionStart,
} from '../services/actions/web-socket';
import { WS_URL } from '../utils/data';
import { getCookie } from '../utils/cookies';

interface IOrderPage {
  privateRoute?: boolean;
}

const OrderPage: FC<IOrderPage> = ({ privateRoute }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (privateRoute) {
      dispatch(wsConnectionAuthStart(`${WS_URL}?token=${getCookie('token')}`));
    } else {
      dispatch(wsConnectionStart(`${WS_URL}/all`));
    }
    return () => {
      if (privateRoute) {
        dispatch(wsConnectionAuthClose());
      } else {
        dispatch(wsConnectionClose());
      }
    };
  }, [dispatch, privateRoute]);

  const { id } = useParams<{ id: string }>();
  const { orders } = useSelector((store) => store.ws.feed);
  const { orders: orderHistory } = useSelector(
    (store) => store.ws.orderHistory
  );

  const orderBase = privateRoute ? orderHistory : orders;

  const orderIndex = useMemo(() => {
    if (orderBase && orderBase.length) {
      return orderBase
        .map((order: TFeedItem) => order._id)
        .findIndex((orderId: string) => orderId === id);
    }
  }, [orderBase, id]);

  let content;

  if (orderBase && orderBase.length && orderIndex >= 0) {
    content = <OrderContent />;
  }

  if (orderBase && orderBase.length && orderIndex < 0) {
    content = <Page404 />;
  }

  if (!orderBase || !orderBase.length) {
    content = <Loader size="large" />;
  }

  return (
    <Layout>
      <div className="mt-20">{content}</div>
    </Layout>
  );
};

export default OrderPage;
