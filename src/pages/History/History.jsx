import style from "./History.module.css";
import MealBCC from "../../components/MealBCC/MealBCC";
import {useEffect} from "react";
import { useNavigate } from "react-router-dom";


let page = "history";

const SelectsDiv = () => {
	return (
		<div className={style.selectsDiv}>
			<select name="carbsInterval" id="carbsInterval">
				<option value="mostRecent">Most recent meals</option>
				<option value="tooMany">Too many units</option>
				<option value="right">Right units</option>
				<option value="tooFew">Too few units</option>
			</select>
			<select name="mealsCategory" id="mealsCategory">
				<option value="all">All grams intervals</option>
				<option value="0-30">0 - 30 grams</option>
				<option value="31-60">31 - 60 grams</option>
				<option value="61-90">61 - 90 grams</option>
				<option value="moreThan91">More than 91 grams</option>
			</select>
		</div>
	);
};

const CheckboxesDiv = () => {
	return (
		<div className={style.checkboxesDiv}>
			<input type="checkbox" name="firstMeals" id="firstMeals" defaultChecked />
			<label htmlFor="firstMeals">First meals</label>
			<input type="checkbox" name="snacks" id="snacks" defaultChecked />
			<label htmlFor="snacks">Snacks</label>
			<input
				type="checkbox"
				name="physicalActivity"
				id="physicalActivity"
				defaultChecked
			/>
			<label htmlFor="physicalActivity">Physical activity</label>
		</div>
	);
};

const MealsDiv = () => {
	return (
		<div className={style.mealsDiv}>
			<MealBCC page={page} />
			<MealBCC page={page} />
			<MealBCC page={page} />
			<MealBCC page={page} />
			<MealBCC page={page} />
			<MealBCC page={page} />
		</div>
	);
};

const History = () => {
	const navigate = useNavigate();


	useEffect(() => {
		if (localStorage.getItem("authToken") === null) {
		  navigate("/login");
		}
	  }, [navigate]);
	return (
			<main>
				<div className={style.mainContentDiv}>
					<h1>History of meals</h1>
					<div className={style.filtersDiv}>
						<SelectsDiv />
						<CheckboxesDiv />
					</div>
					<MealsDiv />
					<button className={style.viewMoreButton}>View more</button>
				</div>
			</main>
	);
};

export default History;
