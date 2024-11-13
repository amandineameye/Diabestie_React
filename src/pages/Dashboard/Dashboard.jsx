import style from "./Dashboard.module.css";
import GreetingsAndDate from "../../containers/GreetingsAndDate/GreetingsAndDate";
import IncompleteMeals from "../../containers/IncompleteMeals/IncompleteMeals";
import MealBCC from "../../components/MealBCC/MealBCC";
import DeleteButton from "../../components/DeleteButton/DeleteButton";

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
		<>
			<h2>Most recent meals</h2>
			<div className={style.data}>
				<MealBCC page={page} />
				<MealBCC page={page} />
				<MealBCC page={page} />
				<MealBCC page={page} />
				<MealBCC page={page} />
			</div>
		</>
	);
};


const Dashboard = () => {
	return (
			<main>
				<GreetingsAndDate />
				<div className={style.content}>
					<div className={style.leftContent}>
						<IncompleteMeals />
						<QuickNote />
					</div>
					<div className={style.rightContent}>
						<MostRecentMeals />
					</div>
				</div>
			</main>
	);
};

export default Dashboard;
