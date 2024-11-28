import style from "./BolusCalcForm.module.css";
import { useEffect, useState } from "react";

const BolusCalcForm = () => {
	const [bolusObject, setBolusObject] = useState({
		correctionBolus: "",
		mealBolus: "",
	});
	const [totalBolus, setTotalBolus] = useState("");

	const handleChange = (e) => {
		setBolusObject((prevObject) => {
			return { ...prevObject, [e.target.name]: e.target.value };
		});
	};

	useEffect(() => {
		if (bolusObject.correctionBolus && bolusObject.mealBolus) {
			const correctionBolusNumber = parseFloat(bolusObject.correctionBolus);
			const mealBolusNumber = parseFloat(bolusObject.mealBolus);

			// Check if both are valid numbers before summing
			if (!isNaN(correctionBolusNumber) && !isNaN(mealBolusNumber)) {
				setTotalBolus(correctionBolusNumber + mealBolusNumber);
			}
		} else {
			setTotalBolus("");
		}
	}, [bolusObject]);
	return (
		<form className={style.bolusCalcForm}>
			<div className={style.inputsRowsDiv}>
				<div>
					<label htmlFor="bloodSugarRate">Blood sugar rate</label>
					<div>
						<input
							type="number"
							name="bloodSugarRate"
							id="bloodSugarRate"
							autoComplete="off"
						/>
						<span>mg/dL</span>
					</div>
				</div>

				<div>
					<label htmlFor="correctionBolus">Correction bolus</label>
					<div>
						<input
							type="number"
							name="correctionBolus"
							id="correctionBolus"
							value={bolusObject.correctionBolus}
							onChange={handleChange}
							autoComplete="off"
						/>
						<span>units</span>
					</div>
				</div>

				<div>
					<label htmlFor="mealBolus">Meal bolus</label>
					<div>
						<input
							type="number"
							name="mealBolus"
							id="mealBolus"
							autoComplete="off"
							value={bolusObject.mealBolus}
							onChange={handleChange}
						/>
						<span>units</span>
					</div>
				</div>
			</div>

			<div className={style.totalBolusDiv}>
				<p>Total bolus</p>
				<div>
					<div>{totalBolus}</div>
					<span>units</span>
				</div>
			</div>
		</form>
	);
};

export default BolusCalcForm;
