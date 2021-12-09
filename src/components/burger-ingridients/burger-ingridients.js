import React, {useState, useEffect} from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingridients.module.css';
import Ingridient from '../ingridient/ingridient';
import PropTypes from 'prop-types';

const tabs = [{id: 'bun', title: 'Булки'}, {id: 'sauce', title: 'Соусы'},{id: 'main', title: 'Начинки'}];

const BurgerIngridients = ({list, cart, onIngridientClick}) => {
  const [current, setCurrent] = useState('bun');

  useEffect(() => {
    const target = document.querySelector(`#${current}`)
    target.scrollIntoView({behavior: 'smooth'});
  }, [current]);

  return (
    <section className={'mr-10 pt-10 ' + styles.ingridients}>
      <h2 className="text text_type_main-large mb-5">Соберите бургер</h2>
      <div className={'mb-10 ' + styles['tab-controls']}>
        {tabs.map(tabItem => (
          <Tab key={tabItem.id} value={tabItem.id} active={current === tabItem.id} onClick={setCurrent}>
            {/* <Link to={tabItem.id}>{tabItem.title}</Link> */}
            {tabItem.title}
          </Tab>
        ))}
      </div>
      <div className={styles['tab-content'] + ' custom-scroll'}>
        {tabs.map(tabItem => (
          <React.Fragment key={tabItem.id}>
            <h3 className="text text_type_main-medium mb-6" id={tabItem.id}>{tabItem.title}</h3>
            <ul className={styles.list + ' mb-10 pl-4 pr-4'}>
              {list.filter(item => item.type === tabItem.id).map(element => {
                const itemsInCart = cart.filter(cartItem => cartItem._id === element._id);
                const amount = itemsInCart.length;
                return (
                  <li  key={element['_id']} className={styles.item + ' mr-6 mb-10'}>
                    <Ingridient item={element} amount={amount} onClick={onIngridientClick}/>
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

BurgerIngridients.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    proteins: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
    calories: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    image_mobile: PropTypes.string.isRequired,
    image_large: PropTypes.string.isRequired,
    __v: PropTypes.number.isRequired0
  })).isRequired,
  cart: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    proteins: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
    calories: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    image_mobile: PropTypes.string.isRequired,
    image_large: PropTypes.string.isRequired,
    __v: PropTypes.number.isRequired0
  })).isRequired,
  onIngridientClick: PropTypes.func.isRequired,
}

export default BurgerIngridients;
