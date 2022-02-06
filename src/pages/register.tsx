import React, {ChangeEvent, useState} from 'react';
import Layout from './layout';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './forms.module.css';
import { Link, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { showNotification } from '../services/actions/app';
import { Paths } from '../utils/data';
import { registerUser } from '../services/actions/user';

const RegisterPage = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });

  const dispatch = useDispatch();
  const {isAuthorized, justRegistered} = useSelector((store: any) => store.user);

  if (isAuthorized) {
    return (
      <Redirect to={{pathname: Paths.HOME}} />
    )
  };

  if (justRegistered) {
    return (
      <Redirect to={{pathname: Paths.HOME}} />
    )
  };

  const formSubmitHandler = (evt: React.FormEvent) => {
    evt.preventDefault();
    if (form.name.trim() === '' || form.email.trim() === '' || form.password.trim() === '') {
      dispatch(showNotification('Заполните все поля формы'))
    } else {
      dispatch(registerUser(form));
    }
  }

  const formChangeHandler = (evt: ChangeEvent<HTMLInputElement>) => {
    setForm(prevForm => ({...prevForm, [evt.target.name]: evt.target.value}))
  }

  return (
    <Layout>
      <section className={styles.login}>
        <div className={"mb-20 " + styles.form}>
          <h2 className={"text text_type_main-medium mb-6 " + styles.heading}>Регистрация</h2>
          <form className="mb-20" onSubmit={formSubmitHandler}>
            <Input 
              type={'text'} 
              placeholder={'Имя'}
              name='name'
              value={form.name}
              onChange={formChangeHandler}
            />
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
              Зарегистрироваться
            </Button>
          </form>
          <div className={"text text_type_main-default " + styles.actions}>
            <div className="mb-4">
              <span>Уже зарегистрированы? </span>
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

export default RegisterPage;
