import React, { useState } from 'react';
import Layout from './layout';
import {
  Button,
  Input,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './profile.module.css';
import { NavLink } from 'react-router-dom';
import { Paths } from '../utils/data';
import { useDispatch, useSelector } from 'react-redux';
import { signOut, updateUser } from '../services/actions/user';

const ProfilePage = () => {
  const [nameDisabled, setNameDisabled] = useState(true);
  const [mailDisabled, setMailDisabled] = useState(true);
  const [passwordDisabled, setPasswordDisabled] = useState(true);
  const { user } = useSelector((store) => store);
  const dispatch = useDispatch();

  const initialState = {
    name: user.name,
    email: user.email,
    password: user.password,
    isTouched: false,
  };

  const [form, setForm] = useState(initialState);

  const formChangeHandler = (evt) => {
    setForm((prevForm) => ({
      ...prevForm,
      [evt.target.name]: evt.target.value,
      isTouched: true,
    }));
  };

  const saveChangesHandler = (evt) => {
    evt.preventDefault();
    dispatch(updateUser({ 
      name: form.name,
      email: form.email,
      password: form.password,
    }));
  };

  const resetChangesHandler = (evt) => {
    evt.preventDefault();
    setForm(initialState);
  };

  const signOutHandler = (evt) => {
    evt.preventDefault();
    dispatch(signOut());
  };

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
            В этом разделе вы можете изменить свои персональные данные
          </p>
        </div>
        <div className={styles.form}>
          <form className="mb-20">
            <Input
              type={'text'}
              name={'name'}
              disabled={nameDisabled}
              onIconClick={() => setNameDisabled(false)}
              onBlur={() => setNameDisabled(true)}
              placeholder={'Имя'}
              icon={'EditIcon'}
              value={form.name}
              onChange={formChangeHandler}
            />
            <Input
              type={'email'}
              name={'email'}
              disabled={mailDisabled}
              onIconClick={() => setMailDisabled(false)}
              onBlur={() => setMailDisabled(true)}
              value={form.email}
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
              value={form.password}
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
        </div>
      </section>
    </Layout>
  );
};

export default ProfilePage;
