import style from "./IncompleteMeals.module.css";
import IncompleteMealForm from "../../components/IncompleteMealForm/IncompleteMealForm";
import { fetchIncompleteMeals } from "../../services/dashboard.service.js";
import { useEffect, useState } from "react";

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

const Table = ({ meals, refreshMeals }) => {
	return (
		<table className={style.table}>
			<TableHead />
			<tbody>
				{meals.map((meal) => {
					return (
						<IncompleteMealForm
							key={meal.id}
							{...meal}
							refreshMeals={refreshMeals}
						/>
					);
				})}
			</tbody>
		</table>
	);
};

const IncompleteMeals = ({ className = "" }) => {
	const [meals, setMeals] = useState([]);

	const getMeals = async () => {
		const fetchedMeals = await fetchIncompleteMeals();

		const processedMeals = fetchedMeals.map((meal) => {
			const date = new Date(meal.time);
			date.setHours(date.getHours() + 3);
			const processedTime = date.toLocaleTimeString("fr-BE", {
				hour: "2-digit",
				minute: "2-digit",
			});

			return {
				id: meal.id,
				time: processedTime,
			};
		});
		setMeals(processedMeals);
		return processedMeals;
	};

	const refreshMeals = async () => {
		try {
			const processedMeals = await getMeals();
			console.log("Refreshed meals:", processedMeals);
		} catch (error) {
			console.log("Could not refresh meals");
		}
	};

	useEffect(() => {
		const fetchMeals = async () => {
			await getMeals();
		};
		fetchMeals();
	}, []);

	return (
		<div className={`${style.incompleteMeals} ${className}`}>
			<h2>Incomplete meals</h2>
			<Table meals={meals} refreshMeals={refreshMeals} />
		</div>
	);
};

export default IncompleteMeals;
