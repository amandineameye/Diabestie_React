import style from "./IncompleteMealForm.module.css";

const IncompleteMealForm = () => {
	return (
		<tr className={style.row}>
			<td>23:30</td>
			<td>
				<input type="text" id="bloodSugarRate" />
				<span>mg/dL</span>
			</td>
			<td>
				<input
					type="checkbox"
					name="physicalActivity2"
					id="physicalActivity2"
				/>
			</td>
			<td>
				<button type="submit">Submit</button>
			</td>
		</tr>
	);
};

export default IncompleteMealForm;
