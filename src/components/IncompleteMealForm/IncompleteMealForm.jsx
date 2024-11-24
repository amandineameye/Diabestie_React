import style from "./IncompleteMealForm.module.css";
import { patchIncompleteMeals } from "../../services/dashboard.service.js";
import { useState } from "react";

const IncompleteMealForm = ({ id, time, refreshMeals }) => {
	const [bloodSugarAfter, setBloodSugarAfter] = useState("");
	const [wasActiveAfter, setWasActiveAfter] = useState(false);

	const handleTextChange = (e) => {
		setBloodSugarAfter(e.target.value);
	};

	const handleCheckboxChange = (e) => {
		setWasActiveAfter(e.target.checked);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			console.log("Submitting form...");
			const patchResponse = await patchIncompleteMeals(
				id,
				parseInt(bloodSugarAfter),
				wasActiveAfter
			);
			console.log("Form submitted, refreshing meals...", patchResponse);
			await refreshMeals();
			console.log("Meals refreshed.");
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<form id={`meal_form_${id}`} onSubmit={handleSubmit} method="POST"></form>

			<tr className={style.row}>
				<td>{time}</td>
				<td>
					<input
						type="text"
						id="bloodSugarRate"
						autocomplete="off"
						form={`meal_form_${id}`}
						onChange={handleTextChange}
						value={bloodSugarAfter}
					/>
					<span>mg/dL</span>
				</td>
				<td>
					<input
						type="checkbox"
						name="physicalActivity2"
						id="physicalActivity2"
						form={`meal_form_${id}`}
						checked={wasActiveAfter}
						onChange={handleCheckboxChange}
					/>
				</td>
				<td>
					<button type="submit" form={`meal_form_${id}`}>
						Submit
					</button>
				</td>
			</tr>
		</>
	);
};

export default IncompleteMealForm;
