import style from "./AddMeal2.module.css";
import MealBCC from "../../components/MealBCC/MealBCC";
import TagsChoice from "../TagsChoice/TagsChoice";
import CarbsResultsTable from "../CarbsResultsTable/CarbsResultsTable";
import BolusCalcForm from "../BolusCalcForm/BolusCalcForm";
import {
	postAndFetchSimilarMeals,
	patchNewMeal,
} from "../../services/addMeal2.service.js";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { mealClear } from "../../store/mealData/mealData.action.ts";
import { checkTokenPresentAndUnexpired } from "../../tools/authTools.js";
import { useNavigate } from "react-router-dom";

const AddMeal2 = ({ onClickAddMeal = () => {} }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [similarMeals, setSimilarMeals] = useState([]);

	const totalCarbs = useSelector((state) => state.mealData.totalCarbs);

	const newMeal = useSelector((state) => state.mealData);

	const handleButtonClick = async () => {
		const isTokenValid = checkTokenPresentAndUnexpired();
		if (!isTokenValid) navigate("/login");
		if (!newMeal.bloodSugarBefore || !newMeal.bolus.totalBolus) {
			console.log("Missing inputs");
			return;
		}
		try {
			const newMealFinalObject = {
				totalCarbs: newMeal.totalCarbs,
				totalBolus: newMeal.bolus.totalBolus,
				bloodSugarBefore: newMeal.bloodSugarBefore,
				firstMeal: newMeal.tags.firstMeal,
				snack: newMeal.tags.snack,
				wasActiveBefore: newMeal.tags.wasActiveBefore,
			};
			const response = await patchNewMeal(newMealFinalObject);
			console.log(response.data.message);
			dispatch(mealClear());
			onClickAddMeal();
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		const isTokenValid = checkTokenPresentAndUnexpired();
		if (!isTokenValid) navigate("/login");
	}, [navigate]);

	useEffect(() => {
		const isTokenValid = checkTokenPresentAndUnexpired();
		if (!isTokenValid) navigate("/login");
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

				{similarMeals.length ? (
					similarMeals.map((meal, index) => {
						return (
							<div key={index} className={style.previousMealDiv}>
								<MealBCC {...meal} />
							</div>
						);
					})
				) : (
					<div className={style.noMeals}>No meals yet</div>
				)}

				<div className={style.tagsDiv}>
					<TagsChoice />
				</div>
			</div>
			<button className={style.addMealButton} onClick={handleButtonClick}>
				Add meal
			</button>
		</div>
	);
};

export default AddMeal2;
