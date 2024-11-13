import style from "./TagsChoice.module.css";
import {useState} from "react"

const TagsChoice = () => {

  const [activeItems, setActiveItems] = useState({firstMeal: false, snack: false, physicalActivity: false});

const handleClick = (tag) => {

  setActiveItems((prevObject) => ({
    ...prevObject,
    [tag]: !prevObject[tag]}
  ))
  
}

  
  return (
    <div className={style.row}>
      <div className={style.cell}>
        <p>First meal</p>
        <div onClick={() => handleClick("firstMeal")} className={activeItems["firstMeal"] && style.active}>☕️</div>
      </div>
      <div className={style.cell}>
        <p>Snack</p>
        <div onClick={() => handleClick("snack")} className={activeItems["snack"] && style.active}>🍩</div>
      </div>
      <div className={style.cell}>
        <p>Physical activity</p>
        <div onClick={() => handleClick("physicalActivity")} className={activeItems["physicalActivity"] && style.active}>⛹🏽‍♂️</div>
      </div>
    </div>
  );
};

export default TagsChoice;