import React, {FC} from 'react';
import styles from './ingredients.module.css';

interface IIngredients {
  list: string[];
};

const Ingredients: FC<IIngredients> = ({list}) => {
  let listContent;
  if (list.length <= 6) {
    listContent = list.map((item, i) => {
      return (
        <li className={styles.item} style={{zIndex: 6-i}}>
          <img src={item} alt="Ингредиент бургера" />
        </li>
      )
    })
  } else {
    listContent = list.slice(0, 6).map((item, i) => {
      return (
        i === 5 ?  <li className={styles.item + " " + styles.withextra} style={{zIndex: 6-i}}>
        <img src={item} alt="Ингредиент бургера" />
        <span className={styles.extra + " text text_type_main-default"}>+{list.length - 5}</span>
      </li> : <li className={styles.item} style={{zIndex: 6-i}}>
          <img src={item} alt="Ингредиент бургера" />
        </li>
      )
    })
  }

  return (
    <ul className={styles.list}>
      {listContent}
    </ul>
  )
} 
  <li className={styles.item}></li>
export default Ingredients;
