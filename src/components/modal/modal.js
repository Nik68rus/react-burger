import React, {useEffect} from 'react';
import ReactDOM from 'react-dom';
import styles from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modal-overlay/modal-overlay';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setIngredient } from '../../services/actions';

const modalRoot = document.getElementById("react-modals");

const Modal = ({onClose, heading, children}) => {
  const {id} = useParams();
  const dispatch = useDispatch();
  const list = useSelector(store => store.ingredient.list);
  const item = list.find(ing => ing._id === id);
  const ingredientsLoaded = useSelector(store => store.ingredient.ingredientsLoaded);

  useEffect(() => {
    if (ingredientsLoaded && item) {
      dispatch(setIngredient(item))
    }
  }, [dispatch, item, ingredientsLoaded]);

  const escPressHandler = React.useCallback((evt) => {
    if (evt.key === 'Escape') {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    document.addEventListener('keydown', escPressHandler);
    return () => {
      document.removeEventListener('keydown', escPressHandler);
    };
  }, [escPressHandler]);
  return ReactDOM.createPortal(
    <section className={styles.modal}>
      <ModalOverlay onClick={onClose} />
      <div className={styles.content + " pl-10 pt-10 pr-10 pb-15"}>
        <button className={styles.closeBtn} type="button" onClick={onClose}>
          <CloseIcon type="primary" />
        </button>
        {heading && <h2 className={styles.heading + "  text text_type_main-large"}>{heading}</h2>}
        {children}
      </div>
    </section>, modalRoot
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
