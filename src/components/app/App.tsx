import React, {useState} from 'react';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import {ingredients, currentBurger} from '../../utils/data';
import OrderDetails from '../order-details/order-details';
import IngredientDetails from '../ingredient-details/ingredient-details';
import styles from './app.module.css';
import Modal from '../modal/modal';

const initialIngredient = ingredients[0];

function App() {
  const [popupVisible, setPopupVisible] = useState(false);
  const [ingredientVisible, setIngredientVisible] = useState(false);
  const [ingredient, setIngredient] = useState(initialIngredient);

  const popupCloseHandler = (evt:Event) => {
    evt.preventDefault();
    setPopupVisible(false);
  }

  const popupOpenHandler = (evt:Event) => {
    evt.preventDefault();
    setPopupVisible(true);
  }

  const ingredientShowHandler = (data:any) => {
    setIngredient(data)
    setIngredientVisible(true);
  };

  const ingredientHideHandler = () => {
    setIngredientVisible(false);
  };

  return (
    <div className={styles.screen + " pb-10"}>
      <AppHeader />
      <main>
        <div className={styles.wrapper + " container"}>
          <BurgerIngredients list={ingredients} cart={currentBurger} onIngredientClick={ingredientShowHandler}/>
          <BurgerConstructor cart={currentBurger} onOrder={popupOpenHandler}/>
        </div>
        {popupVisible && (
          <Modal onClose={popupCloseHandler}>
            <OrderDetails />
          </Modal>
        )}
        {ingredientVisible && (
          <Modal onClose={ingredientHideHandler} heading={'Детали ингредиента'}>
            <IngredientDetails item={ingredient}/>
          </Modal>
        )}
      </main>
    </div>
  );
}

export default App;
