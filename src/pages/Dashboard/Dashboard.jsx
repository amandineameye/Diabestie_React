import style from "./Dashboard.module.css";
import axios from "axios";
import GreetingsAndDate from "../../containers/GreetingsAndDate/GreetingsAndDate";
import IncompleteMeals from "../../containers/IncompleteMeals/IncompleteMeals";
import MealBCC from "../../components/MealBCC/MealBCC";
import DeleteButton from "../../components/DeleteButton/DeleteButton";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { checkTokenPresentAndUnexpired } from "../../tools/authTools.js";

let page = "dashboard";

const QuickNote = () => {
	const [note, setNote] = useState("");
	const [isLoading, setLoading] = useState(false);

	const getNote = async () => {
		try {
			const token = localStorage.getItem("authToken");
			const headers = {
				headers: {
					authorization: `Bearer ${token}`,
				},
			};
			const response = await axios.get(
				"http://localhost:8000/dashboard/getNote",
				headers
			);
			return response.data.note;
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		const fetchNote = async () => {
			setLoading(true);
			const fetchedNote = await getNote();
			setNote(fetchedNote);
			setLoading(false);
		};
		fetchNote();
	}, []);

	const handleChange = (e) => {
		setNote(e.target.value);
	};

	return (
		<div className={style.note}>
			<h2>Quick note</h2>
			<textarea
				name="postIt"
				id="postIt"
				className={style.postIt}
				value={note}
				onChange={handleChange}
				disabled={isLoading}
			></textarea>
			<DeleteButton page={page} />
		</div>
	);
};

const MostRecentMeals = () => {
	return (
		<div className={style.data}>
			<h2>Most recent meals</h2>
			<div className={style.meals}>
				<MealBCC page={page} />
				<MealBCC page={page} />
				<MealBCC page={page} />
				<MealBCC page={page} />
				<MealBCC page={page} />
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
