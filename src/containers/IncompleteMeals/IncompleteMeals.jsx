import style from "./IncompleteMeals.module.css";
import IncompleteMealForm from "../../components/IncompleteMealForm/IncompleteMealForm";

const TableHead = () => {
	return (
		<thead>
			<tr>
				<th>Time</th>
				<th>Blood sugar rate</th>
				<th>Physical activity</th>
				<th>Submit</th>
			</tr>
		</thead>
	);
};

const Table = () => {
	return (
		<table className={style.table}>
			<TableHead />
			<tbody>
				<IncompleteMealForm />
				<IncompleteMealForm />
				<IncompleteMealForm />
			</tbody>
		</table>
	);
};

const IncompleteMeals = ({ className = "" }) => {
	return (
		<div className={`${style.incompleteMeals} ${className}`}>
			<h2>Incomplete meals</h2>
			<Table />
		</div>
	);
};

export default IncompleteMeals;
