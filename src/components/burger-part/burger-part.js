import React from 'react';
import {PropTypes} from 'prop-types';
import {useDispatch} from 'react-redux';
import styles from './burger-part.module.css';
import {
  ConstructorElement,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import {useDrag, useDrop} from 'react-dnd';
import { itemPropTypes } from '../../utils/prop-types';
import { removeFromCart } from '../../services/actions';

const BurgerPart = ({index, ingredient, onMove, findIndex}) => {
  const dispatch = useDispatch();

  const ingredientRemoveHandler = (index) => {
    dispatch(removeFromCart(index));
  };

  const [, drag] = useDrag(() => ({
    type: 'burger-part',
    item: ingredient,
    end: (item, monitor) => {
      const didDrop = monitor.didDrop();
      if (!didDrop) {
        onMove(index, index);
      }
    }
  }), [index, onMove]);

  const [, drop] = useDrop(() => ({
    accept: 'burger-part',
    canDrop: () => false,
    hover(item, monitor) {
      const dragIndex = findIndex(item);
      onMove(dragIndex, index);
    }
  }), [findIndex, onMove]);

  return (
    <li className={styles.item + ' mb-4'} ref={(node) => drag(drop(node))}>
      <button className={styles.btn + " mr-4"}>
        <DragIcon type="primary" />
      </button>
      <ConstructorElement text={ingredient.name} price={ingredient.price} thumbnail={ingredient.image} handleClose={() => {ingredientRemoveHandler(index)}}/>
    </li>  );
}

BurgerPart.propTypes = {
  index: PropTypes.number.isRequired,
  ingredient: itemPropTypes.isRequired,
  onMove: PropTypes.func.isRequired,
  findIndex: PropTypes.func.isRequired,
};

export default BurgerPart;
