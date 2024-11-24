import style from "./CarbsResultsTable.module.css";

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

const CarbResultsRow = () => {
	return (
		<tr>
			<th>White bread</th>
			<td>130</td>
			<td>49</td>
			<td>65.7</td>
		</tr>
	);
};

const Tfoot = () => {
	return (
		<tfoot>
			<tr>
				<th>Total</th>
				<td></td>
				<td></td>
				<td>
					<p>69</p>
				</td>
			</tr>
		</tfoot>
	);
};

const CarbsResultsTable = () => {
	return (
		<table className={style.table}>
			<Thead />
			<tbody>
				<CarbResultsRow />
				<CarbResultsRow />
				<CarbResultsRow />
			</tbody>
			<Tfoot />
		</table>
	);
};

export default CarbsResultsTable;
