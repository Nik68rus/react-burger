import React from 'react';
import styles from './notification.module.css';
import ReactDOM from 'react-dom';
import { useSelector, useDispatch } from 'react-redux';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { SET_MESSAGE } from '../../services/actions/app';

const notificationRoot = document.getElementById("react-notification");

const Notification = () => {
  const message = useSelector(store => store.app.message);
  const isActive = message.length > 0;
  const dispatch = useDispatch();

  const notificationHideHandler = () => {
    dispatch({type: SET_MESSAGE, payload: ''});
  }

  return ReactDOM.createPortal(
    <section className={`${styles.notification} text text_type_main-default ${isActive ? styles.active : ''}`}>
      <div className={"container " + styles.container}>{message}</div>
      <button type='button' className={styles.closeBtn} onClick={notificationHideHandler}>
        <CloseIcon type='primary' />
      </button>
    </section>, 
    notificationRoot
  );
}

export default Notification;
