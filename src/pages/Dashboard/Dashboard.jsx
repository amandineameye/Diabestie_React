import style from "./Dashboard.module.css";
import GreetingsAndDate from "../../containers/GreetingsAndDate/GreetingsAndDate";
import IncompleteMeals from "../../containers/IncompleteMeals/IncompleteMeals";
import MealBCC from "../../components/MealBCC/MealBCC";
import DeleteButton from "../../components/DeleteButton/DeleteButton";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

let page = "dashboard";

const QuickNote = () => {
  return (
    <div className={style.note}>
      <h2>Quick note</h2>
      <textarea name="postIt" id="postIt" className={style.postIt}></textarea>
      <DeleteButton page={page} />
    </div>
  );
};

const MostRecentMeals = () => {
  return (
    <div className={style.data}>
        <h2>Most recent meals</h2>
        <div className={style.meals}>
        <MealBCC page={page} />
        <MealBCC page={page} />
        <MealBCC page={page} />
        <MealBCC page={page} />
        <MealBCC page={page} />
        </div>
      </div>
  );
};

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("authToken") === null) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <main className="connectedMain">
      <GreetingsAndDate />
      <div className={style.content}>
          <IncompleteMeals className={style.incompleteMeals} />
          <QuickNote />
          <MostRecentMeals />
      </div>
    </main>
  );
};

export default Dashboard;
