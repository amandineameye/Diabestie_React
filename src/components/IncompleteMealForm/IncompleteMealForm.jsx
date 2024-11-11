import style from "./IncompleteMealForm.module.css";

const IncompleteMealForm = () => {
	return (
		<form>
			<p className={style.time}>23:30</p>
			<div className={style.bloodSugarDiv}>
				<input type="text" />
				<span>mg/dL</span>
			</div>
			<div className={style.physicalActivityDiv}>
				<input
					type="checkbox"
					name="physicalActivity2"
					id="physicalActivity2"
				/>
			</div>
			<div className={style.submitDiv}>
				<button type="submit">Submit</button>
			</div>
		</form>
	);
};

export default IncompleteMealForm;
