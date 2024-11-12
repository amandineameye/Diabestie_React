import style from "./AddMeal2.module.css";
import NavBar from "../../components/NavBar/NavBar";

const AddMeal2 = () => {
	return (
		<>
			<NavBar page="addMeal2" />
			<main>
				<div className={style.mainContentDiv}>
					<div className={style.titlesDiv}>
						<h1>Decide on the bolus</h1>
						<h2>Add all the precious details</h2>
					</div>
					<div className={style.boxesDiv}>
						<div className={style.carbsTableDiv}></div>
						<div className={style.bolusCalcDiv}></div>
						<div className={style.previousMealsDiv1}></div>
						<div className={style.previousMealsDiv2}></div>
						<div className={style.previousMealsDiv3}></div>
						<div className={style.tagsDiv}></div>
					</div>
					<button className={style.addMealButton}>Add meal</button>
				</div>
			</main>
		</>
	);
};

export default AddMeal2;
