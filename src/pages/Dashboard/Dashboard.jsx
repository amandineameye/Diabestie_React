import style from "./Dashboard.module.css";
import NavBar from "../../components/NavBar/NavBar";
import GreetingsAndDate from "../../containers/GreetingsAndDate/GreetingsAndDate";
import IncompleteMeals from "../../containers/IncompleteMeals/IncompleteMeals";
import MealBCC from "../../components/MealBCC/MealBCC";

const QuickNote = () => {
	return (
		<div className={style.note}>
			<h2>Quick note</h2>
			<textarea name="postIt" id="postIt" className={style.postIt}></textarea>
			<button className={style.deleteButton}>🗑️</button>
		</div>
	);
};

const MostRecentMeals = () => {
	return (
		<>
			<h2>Most recent meals</h2>
			<div className={style.data}>
				<MealBCC />
				<MealBCC />
				<MealBCC />
				<MealBCC />
				<MealBCC />
			</div>
		</>
	);
};

const Content = () => {
	return (
		<div className={style.content}>
			<div className={style.leftContent}>
				<IncompleteMeals />
				<QuickNote />
			</div>
			<div className={style.rightContent}>
				<MostRecentMeals />
			</div>
		</div>
	);
};

const Dashboard = () => {
	return (
		<>
			<NavBar page="dashboard" />
			<main>
				<GreetingsAndDate />
				<Content />
			</main>
		</>
	);
};

export default Dashboard;
