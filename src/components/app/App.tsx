import React, {useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import {ForgotPasswordPage, HomePage, IngredientPage, LoginPage, NotFoundPage, OrdersPage, ProfilePage, RegisterPage, ResetPasswordPage} from '../../pages';
import { getInredients } from '../../services/actions/ingredient';
import { checkAuth } from '../../services/actions/user';
import { Paths } from '../../utils/data';
import { ProtectedRoute } from '../protected-route/protected-route';

function App() {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getInredients());
    dispatch(checkAuth());
  }, [dispatch]);
  
  return (
    <Router>
      <Switch>
        <Route path={Paths.HOME} exact={true}>
          <HomePage />
        </Route>
        <Route path={Paths.LOGIN} exact={true}>
          <LoginPage />
        </Route>
        <Route path={Paths.REGISTER} exact={true}>
          <RegisterPage />
        </Route>
        <Route path={Paths.FORGOT} exact={true}>
          <ForgotPasswordPage />
        </Route>
        <Route path={Paths.RESET} exact={true}>
          <ResetPasswordPage />
        </Route>
        <ProtectedRoute path={Paths.PROFILE} exact={true}>
          <ProfilePage />
        </ProtectedRoute>
        <ProtectedRoute path={Paths.ORDERS} exact={true}>
          <OrdersPage />
        </ProtectedRoute>
        <Route path={`${Paths.INGREDIENTS}/:id`} exact={true} render={
          ({location}) => {            
            //@ts-ignore
            return location.state?.from === Paths.HOME ? <HomePage /> : <IngredientPage/>
          }
        }
        />  
        <Route>
          <NotFoundPage />
        </Route>

      </Switch>
    </Router>
  );
}

export default App;
