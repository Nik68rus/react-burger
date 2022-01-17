import React, {useState, useEffect} from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients.module.css';
import Ingredient from '../ingredient/ingredient';
import {useSelector, useDispatch} from 'react-redux';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { Loader } from '../loader/loader';
import { REMOVE_INGREDIENT } from '../../services/actions/ingredient';
import { useHistory } from 'react-router-dom';
import { Paths } from '../../utils/data';

const tabs = [{id: 'bun', title: 'Булки'}, {id: 'sauce', title: 'Соусы'},{id: 'main', title: 'Начинки'}];

const BurgerIngredients = () => {
  const [current, setCurrent] = useState('bun');
  const [tabClick, setTabClick] = useState(false);

  const list = useSelector(store => store.ingredient.list);
  const currentIngredient = useSelector(store => store.ingredient.currentIngredient);
  const isLoading = useSelector(store => store.ingredient.ingredientsRequest);
  const dispatch = useDispatch();
  const history = useHistory();

  const detailsHideHandler = () => {
    dispatch({type: REMOVE_INGREDIENT});
    history.replace({pathname: Paths.HOME});
  }

  const tabClickHandler = (value) => {
    setTabClick(true);
    setCurrent(value);
    setTimeout(() => {
      setTabClick(false);
    }, 1000);
  };

  useEffect(() => {
    const container = document.querySelector(`.${styles['tab-content']}`);
    const controls = document.querySelector(`.${styles['tab-controls']}`);
    const headings = container.querySelectorAll('h3');
    
    const border = controls.getBoundingClientRect().bottom;
    
    const scrollHandler = () => {
      const distances = [];

      headings.forEach((heading, i) => {
        const coords = heading.getBoundingClientRect();
        distances[i] = Math.abs(border - coords.top);
      })

      const currentMinDistance = Math.min(...distances);

      distances.forEach((distance, i) => {
        if (distance === currentMinDistance && !tabClick) {
          setCurrent(headings[i].id);
        }
      })
    };

    if (list.length > 0) {
      container.addEventListener('scroll', scrollHandler);
    }
    
    return () => {
      container.removeEventListener('scroll', scrollHandler);
    };
  }, [list, tabClick]);

  useEffect(() => {
    const target = document.querySelector(`#${current}`);
    target.scrollIntoView({behavior: 'smooth'});

  }, [current]);
  
  const filteredList = {};

  tabs.forEach((tab) => {
    filteredList[tab.id] = list.filter(item => item.type === tab.id);
  });

  return (
    <>
      <section className={'mr-10 pt-10 ' + styles.ingredients}>
        <h2 className="text text_type_main-large mb-5">Соберите бургер</h2>
        <div className={'mb-10 ' + styles['tab-controls']}>
          {tabs.map(tabItem => (
            <Tab key={tabItem.id} value={tabItem.id} active={current === tabItem.id} onClick={tabClickHandler}>
              {tabItem.title}
            </Tab>
          ))}
        </div>
        {isLoading ? 
          <Loader size='large'/> : 
          <div className={styles['tab-content'] + ' custom-scroll'}>
            {tabs.map(tabItem => (
              <React.Fragment key={tabItem.id}>
                <h3 className="text text_type_main-medium mb-6" id={tabItem.id}>{tabItem.title}</h3>
                <ul className={styles.list + ' mb-10 pl-4 pr-4'}>
                  {filteredList[tabItem.id].map(element => {
                    return (
                      <li  key={element['_id']} className={styles.item + ' mr-6 mb-10'}>
                        <Ingredient item={element} />
                      </li>
                    )
                  }
                  )}
                </ul>
              </React.Fragment>
            ))}
          </div>
        }
      </section>      
      {
        currentIngredient.modal && 
        <Modal onClose={detailsHideHandler} heading={'Детали ингредиента'}>
          <IngredientDetails />
        </Modal>
      }
    </>
  );
};

export default BurgerIngredients;
