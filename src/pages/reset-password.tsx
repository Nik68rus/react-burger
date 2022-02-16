import React, {ChangeEvent, FormEvent, useState} from 'react';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './forms.module.css';
import { Link, Redirect } from 'react-router-dom';
import Layout from './layout';
import { Paths } from '../utils/data';
import { useDispatch, useSelector } from '../utils/hooks';
import { showNotification } from '../services/actions/app';
import { resetPassword } from '../services/actions/user';

const ResetPasswordPage = () => {
  const [form, setForm] = useState({password: '', code: ''});
  const dispatch = useDispatch();
  const isAuthorized = useSelector((store: any) => store.user.isAuthorized);
  const requested = useSelector((store: any) => store.user.recoveryRequested);
  const recoveryDone = useSelector((store: any) => store.user.recoveryDone);

  if (isAuthorized) {
    return (
      <Redirect to={{pathname: Paths.HOME}} />
    )
  };

  if (!requested && !recoveryDone) {
    return (
      <Redirect to={{pathname: Paths.FORGOT}} />
    )
  };

  if (recoveryDone) {
    return (
      <Redirect to={{pathname: Paths.LOGIN}} />
    )
  };


  const formChangeHandler = (evt: ChangeEvent<HTMLInputElement>) => {
    setForm(prevForm => ({...prevForm, [evt.target.name]: evt.target.value}));
  };

  const submitHandler = (evt: FormEvent) => {
    evt.preventDefault();
    if (form.password.trim() === '' || form.code.trim() === '') {
      dispatch(showNotification('Заполните все поля!'))
    } else {
      dispatch(resetPassword(form));
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
