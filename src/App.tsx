import React, {useState} from 'react';
import AppHeader from './components/app-header/app-header';
import BurgerIngridients from './components/burger-ingridients/burger-ingridients';
import BurgerConstructor from './components/burger-constructor/burger-constructor';
import {ingridients, currentBurger} from './utils/data';
import OrderConfirmation from './components/order-confirmation/order-confirmation';
import IngridientDetails from './components/ingridient-details/ingridient-details';

function App() {
  const [popupVisible, setPopupVisible] = useState(false);
  const [ingridientVisible, setIngridientVisible] = useState(false);
  const [ingridient, setIngridient] = useState({});

  const popupCloseHandler = (evt:Event) => {
    evt.preventDefault();
    setPopupVisible(false);
  }

  const popupOpenHandler = (evt:Event) => {
    evt.preventDefault();
    setPopupVisible(true);
  }

  const ingridientShowHandler = (data:object) => {
    setIngridientVisible(true);
    setIngridient(data)
  };

  const ingridientHideHandler = () => {
    setIngridientVisible(false);
  };

  return (
    <div className="screen pt-10 pb-10">
      <AppHeader />
      <main>
        <div className="container wrapper">
          <BurgerIngridients list={ingridients} cart={currentBurger} onIngridientClick={ingridientShowHandler}/>
          <BurgerConstructor cart={currentBurger} onOrder={popupOpenHandler}/>
        </div>
        {popupVisible && <OrderConfirmation onClose={popupCloseHandler} />}
        {ingridientVisible && <IngridientDetails item={ingridient} onClose={ingridientHideHandler}/>}
      </main>
    </div>
  );
}

export default App;
