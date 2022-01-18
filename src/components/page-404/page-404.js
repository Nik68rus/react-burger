import React from 'react';
import {Link} from 'react-router-dom';
import { Paths } from '../../utils/data';
import styles from './page-404.module.css';

const Page404 = () => {
  return (
    <section className={"container mt-20 " + styles.container}>
      <p className="text text_type_digits-large mb-10">404</p>
      <p className="text text_type_main-medium mb-10">Запрошенной вами страницы не существует!</p>
      <Link to={Paths.HOME} className={"text text_type_main-medium " + styles.link}>На главную</Link>
    </section>
  );
}

export default Page404;
