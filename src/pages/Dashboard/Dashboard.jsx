import style from "./Dashboard.module.css";
import GreetingsAndDate from "../../containers/GreetingsAndDate/GreetingsAndDate";
import IncompleteMeals from "../../containers/IncompleteMeals/IncompleteMeals";
import MealBCC from "../../components/MealBCC/MealBCC";
import DeleteButton from "../../components/DeleteButton/DeleteButton";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { checkTokenPresentAndUnexpired } from "../../tools/authTools.js";
import {
	fetchNote,
	patchNote,
	fetchMealsSummary,
} from "../../services/dashboard.service.js";

const QuickNote = () => {
	const [note, setNote] = useState("");
	const [isLoading, setLoading] = useState(false);

	const handleChange = (e) => {
		setNote(e.target.value);
	};

	const handleBlur = async () => {
		const isTokenValid = checkTokenPresentAndUnexpired();
		if (!isTokenValid) navigate("/login");
		await patchNote(note);
	};

	useEffect(() => {
		const getNote = async () => {
			const isTokenValid = checkTokenPresentAndUnexpired();
			if (!isTokenValid) navigate("/login");
			setLoading(true);
			const fetchedNote = await fetchNote();
			setNote(fetchedNote);
			setLoading(false);
		};
		getNote();
	}, []);

	return (
		<div className={style.note}>
			<h2>Quick note</h2>
			<textarea
				name="postIt"
				id="postIt"
				className={style.postIt}
				value={note}
				onChange={handleChange}
				onBlur={handleBlur}
				disabled={isLoading}
			></textarea>
			<DeleteButton />
		</div>
	);
};

const MostRecentMeals = ({ meals }) => {
	return (
		<div className={style.data}>
			<h2>Most recent meals</h2>
			<div className={style.meals}>
				{meals.map((meal) => {
					return <MealBCC key={meal.id} {...meal} />;
				})}
			</div>
		</div>
	);
};

const Dashboard = () => {
	const navigate = useNavigate();
	const [meals, setMeals] = useState([]);

	const handleNewCompleteMeal = async () => {
		await refreshMeals(); // Fetch fresh meals after completing an incomplete meal
	};

	const refreshMeals = async () => {
		const isTokenValid = checkTokenPresentAndUnexpired();
		if (!isTokenValid) navigate("/login");

		const fetchedMeals = await fetchMealsSummary();
		const processedMeals = fetchedMeals.map((meal) => ({
			id: meal.id,
			carbsGrams: meal.carbsGrams,
			bolus: meal.bolus,
			change: meal.bloodSugarAfter - meal.bloodSugarBefore,
		}));
		setMeals(processedMeals);
	};

	useEffect(() => {
		refreshMeals();
	}, []);

	useEffect(() => {
		const isTokenValid = checkTokenPresentAndUnexpired();
		if (!isTokenValid) navigate("/login");
	}, [navigate]);

	return (
		<main className="connectedMain">
			<GreetingsAndDate />
			<div className={style.content}>
				<IncompleteMeals
					className={style.incompleteMeals}
					onNewCompleteMeal={handleNewCompleteMeal}
				/>
				<QuickNote />
				<MostRecentMeals meals={meals} />
			</div>
		</main>
	);
};

export default Dashboard;
