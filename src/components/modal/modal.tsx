import React, {FC, useEffect} from 'react';
import ReactDOM from 'react-dom';
import styles from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modal-overlay/modal-overlay';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from '../../utils/hooks';
import { setIngredient } from '../../services/actions';
import { TItem } from '../../types';

const modalRoot = document.getElementById("react-modals")!;

interface IModal {
  onClose: () => void;
  heading?: string;
};

const Modal: FC<IModal> = ({onClose, heading, children}) => {
  const {id} = useParams<{id: string}>();
  const dispatch = useDispatch();
  const list = useSelector((store: any) => store.ingredient.list);
  const item = list.find((ing: TItem) => ing._id === id);
  const ingredientsLoaded = useSelector((store: any) => store.ingredient.ingredientsLoaded);

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

export default Modal;
