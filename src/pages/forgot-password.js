import React, {useState} from 'react';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './forms.module.css';
import { Link, Redirect } from 'react-router-dom';
import Layout from './layout';
import { Paths } from '../utils/data';
import { useDispatch, useSelector } from 'react-redux';
import { showNotification } from '../services/actions/app';
import { requestRecovery } from '../services/actions/user';

const ForgotPasswordPage = () => {
  const [mail, setMail] = useState('');
  const dispatch = useDispatch();
  const requested = useSelector(store => store.user.recoveryRequested);
  const isAuthorized = useSelector(store => store.user.isAuthorized);

  if (isAuthorized) {
    return (
      <Redirect to={{pathname: Paths.HOME}} />
    )
  };

  const formSubmitHandler = (evt) => {
    evt.preventDefault();
    if (mail.trim() === '') {
      dispatch(showNotification('Заполните все поля!'))
    } else {
      dispatch(requestRecovery(mail))
    }
  };

  if (requested) {
    return (
      <Redirect to={{pathname: Paths.RESET}} />
    )
  }

  return (
    <Layout>
      <section className={styles.login}>
        <div className={"mb-20 " + styles.form}>
          <h2 className={"text text_type_main-medium mb-6 " + styles.heading}>Восстановление пароля</h2>
          <form className="mb-20" onSubmit={formSubmitHandler}>
            <Input 
              type={'email'} 
              name='mail'
              value={mail}
              onChange={evt => setMail(evt.target.value)}
              placeholder={'Укажите e-mail'}
            />
            <Button type="primary" size="medium">
              Восстановить
            </Button>
          </form>
          <div className={"text text_type_main-default " + styles.actions}>
            <div className="mb-4">
              <span>Вспомнили пароль? </span>
              <Link to={Paths.LOGIN}>
                Войти
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default ForgotPasswordPage;
