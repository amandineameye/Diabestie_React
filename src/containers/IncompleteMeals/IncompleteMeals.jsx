import style from "./IncompleteMeals.module.css";
import IncompleteMealForm from "../../components/IncompleteMealForm/IncompleteMealForm";

const FakeTableHead = () => {
	return (
		<div className={style.fakeTableHead}>
			<p>Time</p>
			<p>Blood sugar rate</p>
			<p>Physical activity</p>
			<p>Submit</p>
		</div>
	);
};

const IncompleteMeals = () => {
	return (
		<div className={style.incompleteMeals}>
			<h2>Incomplete meals</h2>
			<div className={style.fakeTable}>
				<FakeTableHead />
				<IncompleteMealForm />
				<IncompleteMealForm />
				<IncompleteMealForm />
			</div>
		</div>
	);
};

export default IncompleteMeals;
