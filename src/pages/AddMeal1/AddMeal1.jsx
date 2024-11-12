import style from "./AddMeal1.module.css";
import NavBar from "../../components/NavBar/NavBar";
import DeleteButton from "../../components/DeleteButton/DeleteButton";
import { Link } from "react-router-dom";

const SearchBar = () => {
	return (
		<div className={style.searchBarDiv}>
			<span>🔎</span>
			<input type="text" placeholder="Type and select a carb"></input>
		</div>
	);
};

const NewCarb = () => {
	return (
		<div className={style.newCarb}>
			<div className={style.cardHeader}>
				<DeleteButton page="addMeal1" />
				<p>White Bread</p>
			</div>
			<div className={style.cardContent}>
				<p>Quantity</p>
				<input type="text"></input>
				<span>g</span>
			</div>
		</div>
	);
};
const AddMeal1 = () => {
	return (
		<>
			<NavBar page="addMeal1" />
			<main>
				<div className={style.contentDiv}>
					<div className={style.titlesDiv}>
						<h1>What carbs are you eating?</h1>
						<h2>Add their quantity</h2>
					</div>
					<SearchBar />
					<div className={style.resultsDiv}>
						<NewCarb />
						<NewCarb />
						<NewCarb />
						<NewCarb />
						<NewCarb />
					</div>
					<Link to="/addMeal/step2">
						<button className={style.nextButton}>Next</button>
					</Link>
				</div>
			</main>
		</>
	);
};

export default AddMeal1;
