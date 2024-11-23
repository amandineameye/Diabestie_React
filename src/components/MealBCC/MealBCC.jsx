import { CoffeeIcon } from "../Icons/Icons";
import style from "./MealBCC.module.css";

const MealBCC = ({ service }) => {
	return (
		<div
			className={`${style.row} ${
				service === "dashboard"
					? style.dashboardRow
					: service === "addMeal2"
					? style.addMeal2Row
					: service === "history"
					? style.historyRow
					: ""
			}`}
		>
			<div className={style.cell}>
				<p>Bolus</p>
				<p className={style.bolus}>6</p>
			</div>
			<div className={style.cell}>
				<p>Carbs</p>
				<p className={style.carbs}>83</p>
			</div>
			<div className={style.cell}>
				<p>Change</p>
				<p className={style.change}>-30</p>
			</div>
			{(service === "history" || service === "addMeal2") && (
				<div className={style.tagsDiv}>
					<CoffeeIcon />
					<div>🍩</div>
					<div>⛹🏽‍♂️</div>
				</div>
			)}
		</div>
	);
};

export default MealBCC;
