import style from "./AddMeal1.module.css";
import DeleteButton from "../../components/DeleteButton/DeleteButton";
import { useState, useEffect } from "react";
import { postAndFetchCarbsOptions } from "../../services/addMeal1.service";
import { useDispatch } from "react-redux";
import { carbAdd } from "../../store/carbsData/carbsData.action.ts";

const DropDown = ({ options, onSelect = () => {}, onAddCarb = () => {} }) => {
	const dispatch = useDispatch();

	const handleClick = (carbObject) => {
		console.log(carbObject);
		dispatch(carbAdd(carbObject));
		onSelect();
		onAddCarb(carbObject);
	};

	return (
		<div>
			{options.map((carbObject, index) => {
				return (
					<p
						key={index}
						className={style.carbP}
						onClick={() => {
							handleClick(carbObject);
						}}
					>
						{carbObject.carb}
					</p>
				);
			})}
		</div>
	);
};

const SearchBar = ({ onAddCarb = () => {} }) => {
	const [isFocused, setFocused] = useState(false);
	const [inputText, setInputText] = useState("");
	const [debouncedText, setDebouncedText] = useState("");
	const [carbsOptions, setCarbsOptions] = useState([]);

	const clearSearchBar = () => {
		setInputText("");
		setDebouncedText("");
		setCarbsOptions([]);
	};

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
				console.log("Matching carbs: ", response.data.matchingCarbs);
				// const carbsNamesArray = response.data.matchingCarbs.map(
				// 	(carbObject) => {
				// 		return carbObject.carb;
				// 	}
				// );
				setCarbsOptions(response.data.matchingCarbs);
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
			<DropDown
				options={carbsOptions}
				onSelect={clearSearchBar}
				onAddCarb={onAddCarb}
			/>
		</div>
	);
};

const NewCarb = ({ carb }) => {
	return (
		<div className={style.newCarb}>
			<div className={style.cardHeader}>
				<DeleteButton />
				<p>{carb}</p>
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
	const [carbCards, setCarbCards] = useState([]);

	//Note: Carb objects are without the IDs because they come directly fron the DB, we added them to the state but we have not read it with useSelector
	//Maybe an alternative would be to read the state in this component
	const addCarbCard = (carbObject) => {
		setCarbCards((previousArray) => {
			return [...previousArray, carbObject];
		});
	};

	useEffect(() => {
		if (carbCards.length) {
			console.log(carbCards);
		}
	}, [carbCards]);

	return (
		<div className={style.contentDiv}>
			<div className={style.titlesDiv}>
				<h1>What carbs are you eating?</h1>
				<h2>Add their quantity</h2>
			</div>
			<SearchBar onAddCarb={addCarbCard} />
			<div className={style.resultsDiv}>
				{carbCards.map((carbObject, index) => {
					return <NewCarb key={index} {...carbObject} />;
				})}
			</div>

			<button className={style.nextButton} onClick={onClickNext}>
				Next
			</button>
		</div>
	);
};

export default AddMeal1;
