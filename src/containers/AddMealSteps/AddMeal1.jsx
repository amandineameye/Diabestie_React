import style from "./AddMeal1.module.css";
import DeleteButton from "../../components/DeleteButton/DeleteButton";
import { useState } from "react";

const SearchBar = () => {
	const [isFocused, setFocused] = useState(false);

	const handleFocus = () => {
		setFocused(true);
	};

	const handleBlur = () => {
		setFocused(false);
	};

	return (
		<div className={style.searchBarDiv}>
			<span>🔎</span>
			<input
				type="text"
				onFocus={handleFocus}
				onBlur={handleBlur}
				placeholder={isFocused ? "" : "Type and select a carb"}
			></input>
		</div>
	);
};

const NewCarb = () => {
	return (
		<div className={style.newCarb}>
			<div className={style.cardHeader}>
				<DeleteButton />
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
const AddMeal1 = ({ onClickNext }) => {
	return (
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
			</div>

			<button className={style.nextButton} onClick={onClickNext}>
				Next
			</button>
		</div>
	);
};

export default AddMeal1;
