import style from "./CarbsResultsTable.module.css";
import { useSelector } from "react-redux";

const Thead = () => {
	return (
		<thead>
			<tr>
				<th>Your meal</th>
				<th>Quantity</th>
				<th>%</th>
				<th>Carbs</th>
			</tr>
		</thead>
	);
};

const CarbResultsRow = ({ carb, carbsRate, carbsGrams, carbsResult }) => {
	return (
		<tr>
			<th className={style.carbName}>{carb}</th>
			<td>{parseInt(carbsGrams)}</td>
			<td>{parseInt(carbsRate * 100)}</td>
			<td>{carbsResult}</td>
		</tr>
	);
};

const Tfoot = () => {
	const totalCarbs = useSelector((state) => state.mealData.totalCarbs);

	return (
		<tfoot>
			<tr>
				<th>Total</th>
				<td></td>
				<td></td>
				<td>
					<p>{totalCarbs}</p>
				</td>
			</tr>
		</tfoot>
	);
};

const CarbsResultsTable = () => {
	const carbsObjectsArray = useSelector((state) => state.mealData.carbsData);

	return (
		<table className={style.table}>
			<Thead />
			<tbody>
				{carbsObjectsArray &&
					carbsObjectsArray.map((carbObject) => {
						return <CarbResultsRow key={carbObject.id} {...carbObject} />;
					})}
			</tbody>
			<Tfoot />
		</table>
	);
};

export default CarbsResultsTable;
