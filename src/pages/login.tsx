import React, {ChangeEvent, FormEvent, useState} from 'react';
import Layout from './layout';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './forms.module.css';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { Paths } from '../utils/data';
import { useDispatch, useSelector } from 'react-redux';
import { showNotification } from '../services/actions/app';
import { makeSignIn } from '../services/actions/user';
import { History } from 'history';

const LoginPage = () => {
  const isAuthorized = useSelector((store: any) => store.user.isAuthorized);
  const history = useHistory<History & {from: {pathname: string}}>();

  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  const dispatch = useDispatch();

  const formChangeHandler = (evt: ChangeEvent<HTMLInputElement>) => {
    setForm(prevForm => ({...prevForm, [evt.target.name]: evt.target.value}));
  };

  const submitHandler = (evt: FormEvent) => {
    evt.preventDefault();
    if (form.email.trim() === '' || form.password.trim() === '') {
      dispatch(showNotification('Заполните все поля!'))
    } else {
      dispatch(makeSignIn(form));
    }
  }

  if (isAuthorized) {
    return (
      <Redirect to={history.location.state?.from.pathname || Paths.HOME} />
    )
  };

  return (
    <Layout>
      <section className={styles.login}>
        <div className={"mb-20 " + styles.form}>
          <h2 className={"text text_type_main-medium mb-6 " + styles.heading}>Вход</h2>
          <form className="mb-20" onSubmit={submitHandler}>
            <Input 
              type={'email'} 
              placeholder={'E-mail'}
              name='email'
              value={form.email}
              onChange={formChangeHandler}
            />
            <Input 
              type={'password'} 
              placeholder={'Пароль'}
              icon={'ShowIcon'}
              name='password'
              value={form.password}
              onChange={formChangeHandler}
            />
            <Button type="primary" size="medium">
              Войти
            </Button>
          </form>
          <div className={"text text_type_main-default " + styles.actions}>
            <div className="mb-4">
              <span>Вы - новый пользователь? </span>
              <Link to={Paths.REGISTER}>
                Зарегистрироваться
              </Link>
            </div>
            <div>
              <span>Забыли пароль? </span>
              <Link to={Paths.FORGOT}>
                Восстановить пароль
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default LoginPage;