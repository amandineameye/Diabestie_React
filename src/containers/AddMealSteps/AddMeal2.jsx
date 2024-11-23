import style from "./AddMeal2.module.css";
import MealBCC from "../../components/MealBCC/MealBCC";
import TagsChoice from "../TagsChoice/TagsChoice";
import CarbsResultsTable from "../CarbsResultsTable/CarbsResultsTable";
import BolusCalcForm from "../BolusCalcForm/BolusCalcForm";

let service = "addMeal2";

const AddMeal2 = ({ onClickAddMeal }) => {
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
				<div className={style.previousMealsDiv1}>
					<MealBCC service={service} />
				</div>
				<div className={style.previousMealsDiv2}>
					<MealBCC service={service} />
				</div>
				<div className={style.previousMealsDiv3}>
					<MealBCC service={service} />
				</div>
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
