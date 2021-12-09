import React from 'react';
import styles from './order-confirmation.module.css';
import Popup from '../popup/popup';
import PropTypes from 'prop-types';

const OrderConfirmation = ({onClose}) => {
  return (
    <Popup onClose={onClose}>
      <div className={styles["order-confirmation"] + ' pt-30 pb-30 pl-25 pr-25'}>
        <h2 className="text text_type_digits-large mb-8">034536</h2>
        <span className="text text_type_main-medium mb-15">идентификатор заказа</span>
        <img className={styles.image} src="https://s3-alpha-sig.figma.com/img/cb92/8c2e/7d9fa34b16200edb585c8855f1699057?Expires=1639958400&Signature=fBqEqlf5jCv6LootnVSg9V3HnNOpB4B0NMTnk0282HGB0MJoFaAWfh6VUZjbvBmfit-MJF5RrodJnYl7gp4hCLY3qkJCN~H0S4hK-r5Ur-dRm63wLJfsNQDxLTy-WlRk5peGbSezgddOhaJ~NyLz1Zdk-GZQWmhrAISQJaYPI0X9IeOtTthc1D7BuM3hE2h6o4ExNQQhm5QyLv26mb8Rcrr7KhXHdy2xrzc48DaMuPjrNDMW5JVBoKas8bfJBnFvnIaIy5xcyO4UMfNaQESOvd8wFQ0LF-vmdb8gljWzC~LkWNfCKaxd2u2QUBnUBl1mgSiKgXts12D5yI-x57Kz3Q__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA" alt="ok"></img>
        <span className="text text_type_main-default mt-15 mb-2">Ваш заказ начали готовить</span>
        <span className={styles['footer-text'] + " text text_type_main-default"}>Дождитесь готовности на орбитальной станции</span>
      </div>
    </Popup>
  );
}

OrderConfirmation.propTypes = {
  onClose: PropTypes.func.isRequired,
}

export default OrderConfirmation;
