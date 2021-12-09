import React, { Component } from 'react';
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.css';

class AppHeader extends Component {
  render() {
    return (
      <header className={'container pt-4 pb-4 ' + styles.header}>
        <nav className={'text text_type_main-default ' + styles.menu}>
          <a className={'p-5 mr-2 ' + styles.button + ' ' + styles.active} href="constructor">
            <BurgerIcon />
            <span>Конструктор</span>
          </a>
          <a className={'p-5 mr-2 ' + styles.button} href="list">
            <ListIcon />
            <span>Лента заказов</span>
          </a>
        </nav>
        <div className={styles.logo}>
          <Logo />
        </div>
        <nav className={'text text_type_main-default ' + styles.usermenu}>
          <a className={'p-5 ml-2 ' + styles.button} href="account">
            <ProfileIcon />
            <span>Личный кабинет</span>
          </a>
        </nav>
      </header>
    );
  }
}

export default AppHeader;
