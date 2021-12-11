import React, { useState, useEffect } from 'react';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { URL, currentBurger } from '../../utils/data';
import OrderDetails from '../order-details/order-details';
import IngredientDetails from '../ingredient-details/ingredient-details';
import styles from './app.module.css';
import Modal from '../modal/modal';

function App() {
  const [ingredients, setIngredients] = useState([]);
  const [popupVisible, setPopupVisible] = useState(false);
  const [ingredientVisible, setIngredientVisible] = useState(false);
  const [ingredient, setIngredient] = useState(ingredients[0]);
  const [error, setError] = useState({ isActive: false, text: '' });

  useEffect(() => {
    fetch(`${URL}/ingredients`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Что-то пошло не так, попробуйте позже! (${response.status})`);
        }
        return response.json();
      })
      .then((data) => {
        setIngredients(data.data);
      })
      .catch((err) => {
        const message = err.message || 'Что-то пошло не так, перезагрузите страницу!';
        setError({isActive: true, text: message });
      });
  }, []);

  const popupCloseHandler = (evt: Event) => {
    setPopupVisible(false);
  };

  const popupOpenHandler = (evt: Event) => {
    setPopupVisible(true);
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
              <BurgerIngredients
                list={ingredients}
                cart={currentBurger}
                onIngredientClick={ingredientShowHandler}
              />
              <BurgerConstructor
                cart={currentBurger}
                onOrder={popupOpenHandler}
              />
            </>
          )}
        </div>
        {popupVisible && (
          <Modal onClose={popupCloseHandler}>
            <OrderDetails id={'034536'} />
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
