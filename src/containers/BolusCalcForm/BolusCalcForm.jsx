import style from "./BolusCalcForm.module.css";

const BolusCalcForm = () => {
	return (
		<form className={style.bolusCalcForm}>
			<div className={style.inputsRowsDiv}>
				<div>
					<label htmlFor="bloodSugarRate">Blood sugar rate</label>
					<input type="text" name="bloodSugarRate" id="bloodSugarRate" />
					<span>mg/dL</span>
				</div>

				<div>
					<label htmlFor="correctionBolus">Correction bolus</label>
					<input type="text" name="correctionBolus" id="correctionBolus" />
					<span>units</span>
				</div>

				<div>
					<label htmlFor="mealBolus">Meal bolus</label>
					<input type="text" name="mealBolus" id="mealBolus" />
					<span>units</span>
				</div>
			</div>

			<div className={style.totalBolusDiv}>
				<p>Total bolus</p>
				<div></div>
				<span>units</span>
			</div>
		</form>
	);
};

export default BolusCalcForm;
