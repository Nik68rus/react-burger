import React from 'react';
import styles from './order-details.module.css';
import tickImage from '../../images/tick.gif';
import PropTypes from 'prop-types';

const OrderDetails = ({id}) => {
  return (
    <div className={styles["order-details"] + ' pt-20 pb-15 pl-15 pr-15'}>
      <h2 className="text text_type_digits-large mb-8">{id}</h2>
      <span className="text text_type_main-medium mb-15">идентификатор заказа</span>
      <img className={styles.image} src={tickImage} alt="ok"></img>
      <span className="text text_type_main-default mt-15 mb-2">Ваш заказ начали готовить</span>
      <span className={styles['footer-text'] + " text text_type_main-default"}>Дождитесь готовности на орбитальной станции</span>
    </div>
  );
}

OrderDetails.propTypes = {
  id: PropTypes.number.isRequired,
}

export default OrderDetails;
