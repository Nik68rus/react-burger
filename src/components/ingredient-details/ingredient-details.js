import React from 'react';
import styles from './ingredient-details.module.css';
import { itemPropTypes } from '../../utils/prop-types';

const IngredientDetails = ({item}) => {
  return (
    <div className={styles.details}>
      <img className={styles.image + ' mb-4'} src={item.image_large} alt="изображение ингредиента" />
      <span className='text text_type_main-medium mb-8'>
        {item.name}
      </span>
      <ul className={styles.info + ' text text_type_main-default'}>
        <li className={styles['info-item'] + ' mr-5'}>
          <span>Калории,ккал</span>
          <span>{item.calories}</span>
        </li>
        <li className={styles['info-item'] + ' mr-5'}>
          <span>Белки, г</span>
          <span>{item.proteins}</span>
        </li>
        <li className={styles['info-item'] + ' mr-5'}>
          <span>Жиры, г</span>
          <span>{item.fat}</span>
        </li>
        <li className={styles['info-item']}>
          <span>Углеводы, г</span>
          <span>{item.carbohydrates}</span>
        </li>
      </ul>
    </div>
  );
}

IngredientDetails.propTypes = {
  item: itemPropTypes.isRequired,
}

export default IngredientDetails;
