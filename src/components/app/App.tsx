import React, { useState, useEffect, useReducer } from 'react';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { URL } from '../../utils/data';
import OrderDetails from '../order-details/order-details';
import IngredientDetails from '../ingredient-details/ingredient-details';
import styles from './app.module.css';
import Modal from '../modal/modal';
import { ConstructorContext } from '../../services/constructorContext';
import { getRandomArrayElement, getRandomInteger } from '../../utils/utils';

const cartReducer = (state: any, action: any) => {
  switch (action.type) {
    case 'add':
      let count = 1;
      if (action.payload.type === 'bun') {
        count = 2;       
      }

      return { ...state, cart: [...state.cart, action.payload], total: +state.total + count * action.payload.price};
    case 'remove':
      const removeIndex = state.cart.findIndex((item: any) => item._id === action.payload);
      let countRemove = 1;
      if (state.cart[removeIndex].type === 'bun') {
        countRemove = 2;       
      }
      return { ...state, cart: state.cart.slice().splice(removeIndex, 1), total: +state.total - state.cart[removeIndex].price * countRemove };
    case 'order':
      return {...state, orderNumber: action.payload}
    default:
      throw new Error(`Wrong type of action: ${action.type}`);
  }
};

const initialCartState = {
  cart: [],
  total: [],
  orderNumber: 0,
};

function App() {
  const [ingredients, setIngredients] = useState([]);
  const [popupVisible, setPopupVisible] = useState(false);
  const [ingredientVisible, setIngredientVisible] = useState(false);
  const [ingredient, setIngredient] = useState(ingredients[0]);
  const [error, setError] = useState({ isActive: false, text: '' });
  const [cartState, cartDispatcher] = useReducer(cartReducer, initialCartState);

  const getRandomBurger = (data: any) => {
    const buns = data.filter((item: any) => item.type === 'bun');
    const inner = data.filter((item: any) => item.type !== 'bun');
    const burgerSize = getRandomInteger(1, 10);

    cartDispatcher({ type: 'add', payload: getRandomArrayElement(buns) });

    for (let i = 0; i < burgerSize; i++) {
      cartDispatcher({ type: 'add', payload: getRandomArrayElement(inner) });
    }
  };

  useEffect(() => {
    fetch(`${URL}/ingredients`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `Что-то пошло не так, попробуйте позже! (${response.status})`
          );
        }
        return response.json();
      })
      .then((data) => {
        setIngredients(data.data);
        getRandomBurger(data.data);
        
      })
      .catch((err) => {
        const message =
          err.message || 'Что-то пошло не так, перезагрузите страницу!';
        setError({ isActive: true, text: message });
      });
  }, []);

  const popupCloseHandler = (evt: Event) => {
    setPopupVisible(false);
  };

  const popupOpenHandler = (evt: Event) => {
    const data = { ingredients: cartState.cart.map((item: any) => item._id) };

    fetch(`${URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `Что-то пошло не так, попробуйте позже! (${response.status})`
          );
        }
        return response.json();
      })
      .then((data) => {
        setPopupVisible(true);
        console.log(data);
        cartDispatcher({type: 'order', payload: data.order.number});
        // setOrderNumber(data.order.number);
      })
      .catch((err) => {
        const message =
          err.message || 'Что-то пошло не так, перезагрузите страницу!';
        setError({ isActive: true, text: message });
      });
  };

  const ingredientShowHandler = (data: any) => {
    setIngredient(data);
    setIngredientVisible(true);
  };

  const ingredientHideHandler = () => {
    setIngredientVisible(false);
  };

  return (
    <div className={styles.screen + ' pb-10'}>
      <AppHeader />
      <main>
        <div className={styles.wrapper + ' container'}>
          {error.isActive && (
            <p className="container text text_type_main-default mt-5">
              {error.text}
            </p>
          )}
          {!error.isActive && (
            <>
              <ConstructorContext.Provider
                value={{ cartState, cartDispatcher }}
              >
                <BurgerIngredients
                  list={ingredients}
                  onIngredientClick={ingredientShowHandler}
                />
                <BurgerConstructor onOrder={popupOpenHandler} />
              </ConstructorContext.Provider>
            </>
          )}
        </div>
        {popupVisible && (
          <Modal onClose={popupCloseHandler}>
            <OrderDetails id={cartState.orderNumber} />
          </Modal>
        )}
        {ingredientVisible && (
          <Modal onClose={ingredientHideHandler} heading={'Детали ингредиента'}>
            <IngredientDetails item={ingredient} />
          </Modal>
        )}
      </main>
    </div>
  );
}

export default App;
