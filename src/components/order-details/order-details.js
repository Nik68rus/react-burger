import React from 'react';
import styles from './order-details.module.css';

const OrderDetails = () => {
  return (
    <div className={styles["order-details"] + ' pt-20 pb-15 pl-15 pr-15'}>
      <h2 className="text text_type_digits-large mb-8">034536</h2>
      <span className="text text_type_main-medium mb-15">идентификатор заказа</span>
      <img className={styles.image} src="https://s3-alpha-sig.figma.com/img/cb92/8c2e/7d9fa34b16200edb585c8855f1699057?Expires=1639958400&Signature=fBqEqlf5jCv6LootnVSg9V3HnNOpB4B0NMTnk0282HGB0MJoFaAWfh6VUZjbvBmfit-MJF5RrodJnYl7gp4hCLY3qkJCN~H0S4hK-r5Ur-dRm63wLJfsNQDxLTy-WlRk5peGbSezgddOhaJ~NyLz1Zdk-GZQWmhrAISQJaYPI0X9IeOtTthc1D7BuM3hE2h6o4ExNQQhm5QyLv26mb8Rcrr7KhXHdy2xrzc48DaMuPjrNDMW5JVBoKas8bfJBnFvnIaIy5xcyO4UMfNaQESOvd8wFQ0LF-vmdb8gljWzC~LkWNfCKaxd2u2QUBnUBl1mgSiKgXts12D5yI-x57Kz3Q__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA" alt="ok"></img>
      <span className="text text_type_main-default mt-15 mb-2">Ваш заказ начали готовить</span>
      <span className={styles['footer-text'] + " text text_type_main-default"}>Дождитесь готовности на орбитальной станции</span>
    </div>
  );
}

export default OrderDetails;
