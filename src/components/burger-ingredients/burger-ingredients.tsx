import React, {useState, useEffect} from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients.module.css';
import Ingredient from '../ingredient/ingredient';
import {useSelector} from '../../utils/hooks';
import { Loader } from '../loader/loader';
import { TItem, TItemType, TTab } from '../../types';

const tabs: Array<TTab> = [{id: 'bun', title: 'Булки'}, {id: 'sauce', title: 'Соусы'},{id: 'main', title: 'Начинки'}];

const BurgerIngredients = () => {
  const [current, setCurrent] = useState<string>('bun');
  const [tabClick, setTabClick] = useState<boolean>(false);

  const list = useSelector((store: any) => store.ingredient.list);
  const isLoading = useSelector((store: any) => store.ingredient.ingredientsRequest);

  const tabClickHandler = (value: string) => {
    setTabClick(true);
    setCurrent(value);
    setTimeout(() => {
      setTabClick(false);
    }, 1000);
  };

  useEffect(() => {
    const container = document.querySelector(`.${styles['tab-content']}`)!;
    const controls = document.querySelector(`.${styles['tab-controls']}`)!;
    const headings = container.querySelectorAll('h3')!;
    
    const border = controls.getBoundingClientRect().bottom;
    
    const scrollHandler = () => {
      const distances: number[] = [];

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
    const target = document.querySelector(`#${current}`)!;
    target.scrollIntoView({behavior: 'smooth'});

  }, [current]);
  
  const filteredList: {[key in TItemType]: Array<TItem>} = {bun: [], sauce: [], main: []};

  tabs.forEach((tab) => {
    filteredList[tab.id] = list.filter((item: TItem) => item.type === tab.id);
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
    </>
  );
};

export default BurgerIngredients;
