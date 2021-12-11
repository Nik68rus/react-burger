import React, {useState, useEffect} from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients.module.css';
import Ingredient from '../ingredient/ingredient';
import PropTypes from 'prop-types';
import { itemPropTypes } from '../../utils/prop-types';

const tabs = [{id: 'bun', title: 'Булки'}, {id: 'sauce', title: 'Соусы'},{id: 'main', title: 'Начинки'}];



const BurgerIngredients = ({list, cart, onIngredientClick}) => {
  const [current, setCurrent] = useState('bun');
  
  useEffect(() => {
    const target = document.querySelector(`#${current}`)
    target.scrollIntoView({behavior: 'smooth'});
  }, [current]);
  
  const filteredList = {};

  tabs.forEach((tab) => {
    filteredList[tab.id] = list.filter(item => item.type === tab.id);
  });

  return (
    <section className={'mr-10 pt-10 ' + styles.ingredients}>
      <h2 className="text text_type_main-large mb-5">Соберите бургер</h2>
      <div className={'mb-10 ' + styles['tab-controls']}>
        {tabs.map(tabItem => (
          <Tab key={tabItem.id} value={tabItem.id} active={current === tabItem.id} onClick={setCurrent}>
            {tabItem.title}
          </Tab>
        ))}
      </div>
      <div className={styles['tab-content'] + ' custom-scroll'}>
        {tabs.map(tabItem => (
          <React.Fragment key={tabItem.id}>
            <h3 className="text text_type_main-medium mb-6" id={tabItem.id}>{tabItem.title}</h3>
            <ul className={styles.list + ' mb-10 pl-4 pr-4'}>
              {filteredList[tabItem.id].map(element => {
                const itemsInCart = cart.filter(cartItem => cartItem._id === element._id);
                const amount = itemsInCart.length;
                return (
                  <li  key={element['_id']} className={styles.item + ' mr-6 mb-10'}>
                    <Ingredient item={element} amount={amount} onClick={onIngredientClick}/>
                  </li>
                )
              }
              )}
            </ul>
          </React.Fragment>
        ))}
      </div>
    </section>
  );
};

BurgerIngredients.propTypes = {
  list: PropTypes.arrayOf(itemPropTypes).isRequired,
  cart: PropTypes.arrayOf(itemPropTypes).isRequired,
  onIngredientClick: PropTypes.func.isRequired,
}

export default BurgerIngredients;
