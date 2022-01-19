import React, {useState} from 'react';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './forms.module.css';
import { Link, useHistory, Redirect } from 'react-router-dom';
import Layout from './layout';
import { Paths, URL } from '../utils/data';
import { useDispatch, useSelector } from 'react-redux';
import { showNotification } from '../services/actions/app';

const ResetPasswordPage = () => {
  const [form, setForm] = useState({password: '', code: ''});
  const dispatch = useDispatch();
  const history = useHistory();
  const isAuthorized = useSelector(store => store.user.isAuthorized);
  const requested = useSelector(store => store.user.recoveryRequested);
  const recoveryDone = useSelector(store => store.user.recoveryDone);

  if (isAuthorized) {
    return (
      <Redirect to={{pathname: Paths.HOME}} />
    )
  };

  if (!requested) {
    return (
      <Redirect to={{pathname: Paths.FORGOT}} />
    )
  };

  if (recoveryDone) {
    return (
      <Redirect to={{pathname: Paths.LOGIN}} />
    )
  };


  const formChangeHandler = (evt) => {
    setForm(prevForm => ({...prevForm, [evt.target.name]: evt.target.value}));
  };

  const submitHandler = (evt) => {
    evt.preventDefault();
    if (form.password.trim() === '' || form.code.trim() === '') {
      dispatch(showNotification('Заполните все поля!'))
    } else {
      fetch(`${URL}/password-reset/reset`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({password: form.password, token: form.code}),
      })
      .then(response => {
        if (!response.ok) {
          dispatch(showNotification('Что-то пошло не так. Попробуйте позже!'))
        }
        return response.json()
      })
      .then(data => {
        if (!data.success) {
          dispatch(showNotification(data.message))
        } else {
          history.replace({ pathname: Paths.LOGIN });
          dispatch(showNotification('Пароль успешно изменен!'))
        }
      });
    }
    
  }

  return (
    <Layout>
      <section className={styles.login}>
        <div className={"mb-20 " + styles.form}>
          <h2 className={"text text_type_main-medium mb-6 " + styles.heading}>Восстановление пароля</h2>
          <form className="mb-20" onSubmit={submitHandler}>
            <Input 
              type={'password'} 
              placeholder={'Введите новый пароль'}
              icon={'ShowIcon'}
              name='password'
              value={form.password}
              onChange={formChangeHandler}
            />
            <Input 
              type={'text'} 
              placeholder={'Введите код из письма'}
              name='code'
              value={form.code}
              onChange={formChangeHandler}
            />
            <Button type="primary" size="medium">
              Сохранить
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

export default ResetPasswordPage;
