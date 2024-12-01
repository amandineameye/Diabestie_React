import style from "./BolusCalcForm.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	bloodSugarAdd,
	totalBolusAdd,
	mealBolusAdd,
	correctionBolusAdd,
} from "../../store/mealData/mealData.action.ts";

const BolusCalcForm = () => {
	const dispatch = useDispatch();
	const stateBloodSugar = useSelector(
		(state) => state.mealData.bloodSugarBefore
	);
	const stateBolusObject = useSelector((state) => state.mealData.bolus);

	const [bolusObject, setBolusObject] = useState({
		correctionBolus: stateBolusObject.correctionBolus,
		mealBolus: stateBolusObject.mealBolus,
	});
	const [totalBolus, setTotalBolus] = useState(stateBolusObject.totalBolus);
	const [bloodSugar, setBloodSugar] = useState(stateBloodSugar);

	const handleChange = (e) => {
		setBolusObject((prevObject) => {
			return {
				...prevObject,
				[e.target.name]: parseFloat(e.target.value),
			};
		});
	};

	const handleBloodSugarBlur = () => {
		dispatch(bloodSugarAdd(bloodSugar));
	};

	const handleBolusInputsBlur = (e) => {
		if (totalBolus) {
			dispatch(totalBolusAdd(totalBolus));
		}
		if (e.target.name === "correctionBolus") {
			dispatch(correctionBolusAdd(bolusObject.correctionBolus));
		} else if (e.target.name === "mealBolus") {
			dispatch(mealBolusAdd(bolusObject.mealBolus));
		}
	};

	useEffect(() => {
		if (
			(bolusObject.correctionBolus || bolusObject.correctionBolus === 0) &&
			(bolusObject.mealBolus || bolusObject.mealBolus === 0)
		) {
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
							value={bloodSugar}
							onChange={(e) => {
								setBloodSugar(parseInt(e.target.value));
							}}
							onBlur={handleBloodSugarBlur}
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
							autoComplete="off"
							value={bolusObject.correctionBolus}
							onChange={handleChange}
							onBlur={handleBolusInputsBlur}
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
							onBlur={handleBolusInputsBlur}
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
