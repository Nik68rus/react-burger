import React, { useEffect } from 'react';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import styles from './app.module.css';
import { getInredients } from '../../services/actions/ingredient';
import {useSelector, useDispatch} from 'react-redux';
import ErrorMessage from '../error-message/error-message';
import {DndProvider} from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';

function App() {
  // @ts-ignore
  const {error, message} = useSelector(store => store.app);
  
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getInredients());
  }, [dispatch]);

  return (
    <div className={styles.screen + ' pb-10'}>
      <AppHeader />
      <main>
        <div className={styles.wrapper + ' container'}>
          {error && <ErrorMessage message={message} />}
          {!error && (
            <DndProvider backend={HTML5Backend}>
              <BurgerIngredients />
              <BurgerConstructor />
            </DndProvider>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
