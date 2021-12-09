import React from 'react';
import styles from './popup.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const Popup = (props) => {
  return (
    <section className={styles.popup}>
      <div className={styles.overlay}></div>
      <div className={styles.content}>
        <button className={styles.closeBtn + " btn"} type="button" onClick={props.onClose}>
          <CloseIcon type="primary" />
        </button>
        {props.children}
      </div>
    </section>
  );
}

export default Popup;
