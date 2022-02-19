import React from 'react';
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.css';
import { NavLink } from 'react-router-dom';
import { Paths } from '../../utils/data';

const AppHeader = () => {
  return (
    <header className={'pt-4 pb-4 ' + styles.header}>
      <div className={styles.wrapper + " container"}>
        <nav className={'text text_type_main-default ' + styles.menu}>
          <NavLink
            className={'p-5 mr-2 ' + styles.button}
            exact
            to={Paths.HOME}
            activeClassName={styles.active}
          >
            <BurgerIcon type='primary' />
            <span>Конструктор</span>
          </NavLink>
          <NavLink className={'p-5 mr-2 ' + styles.button} exact to={Paths.FEED} activeClassName={styles.active}>
            <ListIcon type='primary' />
            <span>Лента заказов</span>
          </NavLink>
        </nav>
        <div className={styles.logo}>
          <NavLink to={Paths.HOME}>
            <Logo />
          </NavLink>
        </div>
        <nav className={'text text_type_main-default ' + styles.usermenu}>
          <NavLink className={'p-5 ml-2 ' + styles.button} to={Paths.PROFILE} exact activeClassName={styles.active}>
            <ProfileIcon type='primary' />
            <span>Личный кабинет</span>
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default AppHeader;
