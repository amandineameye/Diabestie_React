import style from "./AddMeal2.module.css";
import MealBCC from "../../components/MealBCC/MealBCC";
import TagsChoice from "../TagsChoice/TagsChoice";
import CarbsResultsTable from "../CarbsResultsTable/CarbsResultsTable";
import BolusCalcForm from "../BolusCalcForm/BolusCalcForm";
import { postAndFetchSimilarMeals } from "../../services/addMeal2.service.js";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const AddMeal2 = ({ onClickAddMeal = () => {} }) => {
	const [similarMeals, setSimilarMeals] = useState([]);

	const totalCarbs = useSelector((state) => state.mealData.totalCarbs);

	useEffect(() => {
		const fetchSimilarMeals = async () => {
			if (!totalCarbs) {
				console.log("No total carbs");
				return;
			}
			try {
				const fetchedMeals = await postAndFetchSimilarMeals(totalCarbs);
				setSimilarMeals(fetchedMeals);
			} catch (error) {
				console.error("Error fetching similar meals:", error);
			}
		};
		fetchSimilarMeals();
	}, [totalCarbs]);

	return (
		<div className={style.mainContentDiv}>
			<div className={style.titlesDiv}>
				<h1>Decide on the bolus</h1>
				<h2>Add all the precious details</h2>
			</div>
			<div className={style.boxesDiv}>
				<div className={style.carbsTableDiv}>
					<CarbsResultsTable />
				</div>
				<div className={style.bolusCalcDiv}>
					<BolusCalcForm />
				</div>

				{similarMeals.map((meal, index) => {
					return (
						<div className={`style.previousMealsDiv${index}`}>
							<MealBCC key={index} {...meal} />
						</div>
					);
				})}

				<div className={style.tagsDiv}>
					<TagsChoice />
				</div>
			</div>
			<button className={style.addMealButton} onClick={onClickAddMeal}>
				Add meal
			</button>
		</div>
	);
};

export default AddMeal2;
