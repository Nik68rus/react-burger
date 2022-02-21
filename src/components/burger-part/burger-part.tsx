import React, {FC} from 'react';
import {useDispatch} from '../../utils/hooks';
import styles from './burger-part.module.css';
import {
  ConstructorElement,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import {useDrag, useDrop} from 'react-dnd';
import { removeFromCart } from '../../services/actions';
import { TItem } from '../../types';

interface IBurgerPart {
  index: number;
  ingredient: TItem;
  onMove: (oldIndex: number, newIndex: number) => void;
  findIndex: (item: TItem) => number
};

const BurgerPart: FC<IBurgerPart> = ({index, ingredient, onMove, findIndex}) => {
  const dispatch = useDispatch();

  const ingredientRemoveHandler = (index: number) => {
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
    hover(item: TItem, monitor) {
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

export default BurgerPart;
