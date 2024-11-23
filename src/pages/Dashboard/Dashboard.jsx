import style from "./Dashboard.module.css";
import GreetingsAndDate from "../../containers/GreetingsAndDate/GreetingsAndDate";
import IncompleteMeals from "../../containers/IncompleteMeals/IncompleteMeals";
import MealBCC from "../../components/MealBCC/MealBCC";
import DeleteButton from "../../components/DeleteButton/DeleteButton";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { checkTokenPresentAndUnexpired } from "../../tools/authTools.js";
import { fetchNote, patchNote } from "../../services/dashboard.service.js";

let service = "dashboard";

const QuickNote = () => {
	const [note, setNote] = useState("");
	const [isLoading, setLoading] = useState(false);

	const handleChange = (e) => {
		setNote(e.target.value);
	};

	const handleBlur = async () => {
		await patchNote(note);
	};

	useEffect(() => {
		const getNote = async () => {
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
			<div className={style.buttonDiv}>
				<DeleteButton />
			</div>
		</div>
	);
};

const MostRecentMeals = () => {
	return (
		<div className={style.data}>
			<h2>Most recent meals</h2>
			<div className={style.meals}>
				<MealBCC service={service} />
				<MealBCC service={service} />
				<MealBCC service={service} />
				<MealBCC service={service} />
				<MealBCC service={service} />
			</div>
		</div>
	);
};

const Dashboard = () => {
	const navigate = useNavigate();

	useEffect(() => {
		const isTokenValid = checkTokenPresentAndUnexpired();
		if (!isTokenValid) {
			navigate("/login");
		}
	}, [navigate]);

	return (
		<main className="connectedMain">
			<GreetingsAndDate />
			<div className={style.content}>
				<IncompleteMeals className={style.incompleteMeals} />
				<QuickNote />
				<MostRecentMeals />
			</div>
		</main>
	);
};

export default Dashboard;
