import React from 'react';
import { useDispatch } from '../../utils/hooks';
import { Switch, Route, useLocation, useHistory } from 'react-router-dom';
import {
  ForgotPasswordPage,
  HomePage,
  IngredientPage,
  LoginPage,
  NotFoundPage,
  ProfilePage,
  RegisterPage,
  ResetPasswordPage,
  FeedPage,
  OrderPage,
} from '../../pages';
import { removeIngredient } from '../../services/actions';
import { Paths } from '../../utils/data';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal';
import { ProtectedRoute } from '../protected-route/protected-route';
import OrderContent from '../order-contetnt/order-content';
interface ILocation {
  pathname: string;
  state: {
    background: ILocation;
    modal: 'ingredient' | 'order';
    from?: string;
  };
  background: ILocation;
  modal: 'ingredient' | 'order';
  from?: string;
  search: string;
  hash: string;
  key: string;
}

const Switcher = () => {
  const dispatch = useDispatch();
  const location = useLocation<ILocation>();
  const history = useHistory();

  let background = location.state && location.state.background;
  const modalType = location.state && location.state.modal;

  const detailsHideHandler = () => {
    dispatch(removeIngredient());
    history.replace({ pathname: Paths.HOME });
  };

  const orderHideHandler = () => {
    console.log(location);
    
    history.replace({ pathname: location.state.from });
  };

  return (
    <div>
      <Switch location={background || location}>
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
        <ProtectedRoute path={`${Paths.ORDERS}/:id`} exact={true}>
          <OrderPage privateRoute/>
        </ProtectedRoute>
        <ProtectedRoute path={Paths.PROFILE}>
          <ProfilePage />
        </ProtectedRoute>
        <Route path={Paths.FEED} exact={true}>
          <FeedPage />
        </Route>
        <Route path={`${Paths.FEED}/:id`} exact={true}>
          <OrderPage />
        </Route>
        <Route path={`${Paths.INGREDIENTS}/:id`} exact={true}>
          <IngredientPage />
        </Route>
        <Route>
          <NotFoundPage />
        </Route>
      </Switch>
      {background && modalType === 'ingredient' && (
        <Route path={`${Paths.INGREDIENTS}/:id`}>
          <Modal onClose={detailsHideHandler} heading={'Детали ингредиента'}>
            <IngredientDetails />
          </Modal>
        </Route>
      )}

      {background && modalType === 'order' && (
        <Route path={`${location.state.from}/:id`}>
          <Modal onClose={orderHideHandler}>
            <OrderContent />
          </Modal>
        </Route>
      )}
    </div>
  );
};

export default Switcher;
