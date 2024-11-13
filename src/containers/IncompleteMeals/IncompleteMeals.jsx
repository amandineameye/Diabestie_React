import style from "./IncompleteMeals.module.css";
import IncompleteMealForm from "../../components/IncompleteMealForm/IncompleteMealForm";

const FakeTableHead = () => {
	return (
		<div className={style.fakeTableHead}>
			{/* Pour l'accessibilité et la sémantique -> Une table, déso  */}
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
				<div className={style.fakeTableContent}>
					<IncompleteMealForm />
					<IncompleteMealForm />
					<IncompleteMealForm />
				</div>
			</div>
		</div>
	);
};

export default IncompleteMeals;
