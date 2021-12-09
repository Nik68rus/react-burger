import React from 'react';
import Popup from '../popup/popup';
import styles from './ingridient-details.module.css';
import PropTypes from 'prop-types';

const IngridientDetails = ({item, onClose}) => {
  console.log(item);
  return (
    <Popup onClose={onClose}>
      <div className={styles.details + ' pt-10 pl-10 pr-10 pb-15'}>
        <h2 className={styles.heading + ' text text_type_main-large'}>Детали ингридиента</h2>
        <img className={styles.image + ' mb-4'} src={item.image_large} alt="изображение ингридиента" />
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
    </Popup>
  );
}

IngridientDetails.propTypes = {
  item: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default IngridientDetails;
