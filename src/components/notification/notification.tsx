import React, {FC} from 'react';
import styles from './notification.module.css';
import ReactDOM from 'react-dom';
import { useSelector, useDispatch } from 'react-redux';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { setMessage } from '../../services/actions';

const notificationRoot = document.getElementById("react-notification")!;

interface INatification {
  message: string;
}

const Notification: FC<INatification> = () => {
  const message = useSelector((store: any) => store.app.message);
  const isActive = message.length > 0;
  const dispatch = useDispatch();

  const notificationHideHandler = () => {
    dispatch(setMessage(''));
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
