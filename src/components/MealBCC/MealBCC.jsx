import style from "./MealBCC.module.css";

const MealBCC = () => {
	return (
		<div className={style.row}>
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
		</div>
	);
};

export default MealBCC;
