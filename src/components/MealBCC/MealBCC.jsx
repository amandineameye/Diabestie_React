import { CoffeeIcon } from "../Icons/Icons";
import style from "./MealBCC.module.css";
import clsx from "clsx";
import { useLocation } from "react-router-dom";

const MealBCC = ({
	carbsGrams,
	bolus,
	change,
	firstMeal,
	snack,
	wasActive,
}) => {
	let pathname = useLocation().pathname;

	const divClassName = clsx(
		style.row,
		pathname === "/" && style.dashboardRow,
		pathname === "/addMeal" && style.addMeal2Row,
		pathname === "/history" && style.historyRow
	);
	return (
		<div className={divClassName}>
			<div className={style.cell}>
				<p>Bolus</p>
				<p className={style.bolus}>{bolus}</p>
			</div>
			<div className={style.cell}>
				<p>Carbs</p>
				<p className={style.carbs}>{carbsGrams}</p>
			</div>
			<div className={style.cell}>
				<p>Change</p>
				<p className={style.change}>{change}</p>
			</div>
			{(pathname === "/history" || pathname === "/addMeal") && (
				<div className={style.tagsDiv}>
					{firstMeal && <CoffeeIcon />}
					{snack && <div>🍩</div>}
					{wasActive && <div>⛹🏽‍♂️</div>}
				</div>
			)}
		</div>
	);
};

export default MealBCC;
