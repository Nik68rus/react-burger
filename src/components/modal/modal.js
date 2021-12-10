import React from 'react';
import styles from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modal-overlay/modal-overlay';
import PropTypes from 'prop-types';

const Modal = (props) => {
  return (
    <section className={styles.modal}>
      <ModalOverlay />
      <div className={styles.content + " pl-10 pt-10 pr-10 pb-15"}>
        <button className={styles.closeBtn} type="button" onClick={props.onClose}>
          <CloseIcon type="primary" />
        </button>
        {props.heading && <h2 className={styles.heading + "  text text_type_main-large"}>{props.heading}</h2>}
        {props.children}
      </div>
    </section>
  );
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  heading: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
]).isRequired
}

export default Modal;
