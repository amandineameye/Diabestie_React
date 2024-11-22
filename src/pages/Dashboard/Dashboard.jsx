import style from "./Dashboard.module.css";
import GreetingsAndDate from "../../containers/GreetingsAndDate/GreetingsAndDate";
import IncompleteMeals from "../../containers/IncompleteMeals/IncompleteMeals";
import MealBCC from "../../components/MealBCC/MealBCC";
import DeleteButton from "../../components/DeleteButton/DeleteButton";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

let page = "dashboard";

const QuickNote = () => {
	return (
		<div className={style.note}>
			<h2>Quick note</h2>
			<textarea name="postIt" id="postIt" className={style.postIt}></textarea>
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
		if (localStorage.getItem("authToken") === null) {
			navigate("/login");
		}
	}, [navigate]);

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
			console.log(JSON.stringify(error));
		}
	};

	useEffect(() => {
		const note = getNote();
		console.log("My note is: ", note);
	}, []);

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
