import style from "./AddMeal1.module.css";
import DeleteButton from "../../components/DeleteButton/DeleteButton";
import { useState, useEffect } from "react";
import { postAndFetchCarbsOptions } from "../../services/addMeal1.service";

const DropDown = ({ options }) => {
	return (
		<div>
			{options.map((carb, index) => {
				return (
					<p key={index} className={style.carbP}>
						{carb}
					</p>
				);
			})}
		</div>
	);
};

const SearchBar = () => {
	const [isFocused, setFocused] = useState(false);
	const [inputText, setInputText] = useState("");
	const [debouncedText, setDebouncedText] = useState("");
	const [carbsOptions, setCarbsOptions] = useState([]);

	const handleChange = (e) => {
		setInputText(e.target.value);
	};

	const handleFocus = () => {
		setFocused(true);
	};

	const handleBlur = () => {
		setFocused(false);
	};

	useEffect(() => {
		const handler = setTimeout(() => {
			setDebouncedText(inputText);
		}, 300);

		return () => {
			clearTimeout(handler);
		};
	}, [inputText]);

	useEffect(() => {
		if (debouncedText === "") {
			setCarbsOptions([]);
			return; // Exit early if input is empty
		}

		const searchCarbs = async () => {
			try {
				const response = await postAndFetchCarbsOptions(debouncedText);
				console.log(response.data.matchingCarbs);
				const carbsNamesArray = response.data.matchingCarbs.map(
					(carbObject) => {
						return carbObject.carb;
					}
				);
				setCarbsOptions(carbsNamesArray);
			} catch (error) {
				console.log(error);
			}
		};
		searchCarbs();
	}, [debouncedText]);

	return (
		<div className={style.searchBarDiv}>
			<span>🔎</span>
			<input
				type="text"
				onFocus={handleFocus}
				onBlur={handleBlur}
				placeholder={isFocused ? "" : "Type and select a carb"}
				value={inputText}
				onChange={handleChange}
				className={carbsOptions.length && style.withOptions}
			></input>
			<DropDown options={carbsOptions} />
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
