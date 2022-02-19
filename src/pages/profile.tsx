import React, { ChangeEvent, useState, useEffect, useCallback } from 'react';
import Layout from './layout';
import {
  Button,
  Input,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './profile.module.css';
import { NavLink, useRouteMatch } from 'react-router-dom';
import { Paths, WS_URL } from '../utils/data';
import { useDispatch, useSelector } from '../utils/hooks';
import { makeSignOut, updateUser } from '../services/actions/user';
import FeedItem from '../components/feed-item/feed-item';
import { TFeedItem } from '../types';
import { wsConnectionAuthClose, wsConnectionAuthStart } from '../services/actions/web-socket';
import { getCookie } from '../utils/cookies';

const ProfilePage = () => {
  const [nameDisabled, setNameDisabled] = useState(true);
  const [mailDisabled, setMailDisabled] = useState(true);
  const [passwordDisabled, setPasswordDisabled] = useState(true);
  const { user } = useSelector(store => store);
  const {orders} = useSelector(store => store.ws.orderHistory);
  const {wsAuthConnected} = useSelector(store => store.ws);

  const dispatch = useDispatch();
  const match = useRouteMatch(Paths.ORDERS);

  const sortedOrders = orders && orders.length && orders.sort((a:TFeedItem, b: TFeedItem) => +new Date(b.createdAt) - +new Date(a.createdAt));

  const initialState = {
    name: user.name,
    email: user.email,
    password: user.password,
    isTouched: false,
  };

  const [form, setForm] = useState(initialState);

  const formChangeHandler = (evt: ChangeEvent<HTMLInputElement>) => {
    setForm((prevForm) => ({
      ...prevForm,
      [evt.target.name]: evt.target.value,
      isTouched: true,
    }));
  };

  const saveChangesHandler = () => {
    dispatch(updateUser({ 
      name: form.name,
      email: form.email,
      password: form.password,
    }));
    setForm(prevState => ({...prevState, isTouched: false}));
  };

  const resetChangesHandler = () => {
    setForm(initialState);
  };

  const signOutHandler = (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    dispatch(makeSignOut());
  };

  useEffect(() => {
    if (match && !wsAuthConnected) {
      dispatch(wsConnectionAuthStart(`${WS_URL}?token=${getCookie('token')}`))
    };
    if (!match && wsAuthConnected) {
      dispatch(wsConnectionAuthClose());
    };
    // return () => {      
    //   dispatch(wsConnectionAuthClose());
    // }
  }, [match, dispatch, wsAuthConnected]);

  return (
    <Layout>
      <section className={'container mt-30 ' + styles.profile}>
        <div className={styles.navbar + ' mr-15'}>
          <NavLink
            exact
            to={Paths.PROFILE}
            className={styles.link + ' text text_type_main-medium mb-5'}
            activeClassName={styles.active}
          >
            Профиль
          </NavLink>
          <NavLink
            exact
            to={Paths.ORDERS}
            className={styles.link + ' text text_type_main-medium mb-5'}
            activeClassName={styles.active}
          >
            История заказов
          </NavLink>
          <button
            type="button"
            className={
              styles.button + ' ' + styles.link + ' text text_type_main-medium'
            }
            onClick={signOutHandler}
          >
            Выход
          </button>
          <p
            className={
              styles.description + ' mt-20 text text_type_main-default'
            }
          >
            {!match && 'В этом разделе вы можете изменить свои персональные данные'}
            {match && 'В этом разделе вы можете просмотреть свою историю заказов'}
          </p>
        </div>
        {!match && <div className={styles.form}>
          <form className="mb-20">
            <Input
              type={'text'}
              name={'name'}
              disabled={nameDisabled}
              onIconClick={() => setNameDisabled(false)}
              onBlur={() => setNameDisabled(true)}
              placeholder={'Имя'}
              icon={'EditIcon'}
              value={form.name || ''}
              onChange={formChangeHandler}
            />
            <Input
              type={'email'}
              name={'email'}
              disabled={mailDisabled}
              onIconClick={() => setMailDisabled(false)}
              onBlur={() => setMailDisabled(true)}
              value={form.email || ''}
              placeholder={'E-mail'}
              icon={'EditIcon'}
              onChange={formChangeHandler}
            />
            <Input
              type={'password'}
              name={'password'}
              disabled={passwordDisabled}
              onIconClick={() => setPasswordDisabled(false)}
              onBlur={() => setPasswordDisabled(true)}
              value={form.password || ''}
              onChange={formChangeHandler}
              placeholder={'Пароль'}
              icon={'EditIcon'}
            />
          </form>
          {form.isTouched && (
            <div className={styles.actions}>
              <Button type="primary" size="medium" onClick={saveChangesHandler}>
                Сохранить
              </Button>
              <Button
                type="primary"
                size="medium"
                onClick={resetChangesHandler}
              >
                Отмена
              </Button>
            </div>
          )}
        </div>}
        {match && 
          <div className={styles.orders + " custom-scroll pr-4"}>
            {sortedOrders && sortedOrders.map((order: TFeedItem) => <FeedItem key={order._id} order={order} showStatus/>)}
          </div>
        }
      </section>
    </Layout>
  );
};

export default ProfilePage;
