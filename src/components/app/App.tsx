import React, {useState, useEffect} from 'react';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import {URL, currentBurger} from '../../utils/data';
import OrderDetails from '../order-details/order-details';
import IngredientDetails from '../ingredient-details/ingredient-details';
import styles from './app.module.css';
import Modal from '../modal/modal';

function App() {
  const [ingredients, setIngredients] = useState([]);
  const [popupVisible, setPopupVisible] = useState(false);
  const [ingredientVisible, setIngredientVisible] = useState(false);
  const [ingredient, setIngredient] = useState(ingredients[0]);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(URL).then(response => response.json()).then(data => {
      setIngredients(data.data);
    }).catch(err => setError(true));
  },[]);

  const popupCloseHandler = (evt:Event) => {
    setPopupVisible(false);
  }

  const popupOpenHandler = (evt:Event) => {
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
          {error && (<p>Что-то пошло не так, перезагрузите страницу!</p>)}
          {!error && 
            <>
              <BurgerIngredients list={ingredients} cart={currentBurger} onIngredientClick={ingredientShowHandler}/>
              <BurgerConstructor cart={currentBurger} onOrder={popupOpenHandler}/>
            </>
          }
        </div>
        {popupVisible && (
          <Modal onClose={popupCloseHandler}>
            <OrderDetails id={'034536'} />
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
