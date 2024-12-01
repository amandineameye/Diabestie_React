import style from "./AddMeal1.module.css";
import DeleteButton from "../../components/DeleteButton/DeleteButton.jsx";
import { useState, useEffect } from "react";
import { postAndFetchCarbsOptions } from "../../services/addMeal1.service.js";
import { useDispatch, useSelector } from "react-redux";
import {
	carbAdd,
	quantityAdd,
	carbDelete,
} from "../../store/mealData/mealData.action.ts";
import { checkTokenPresentAndUnexpired } from "../../tools/authTools.js";
import { useNavigate } from "react-router-dom";

const TitlesDiv = () => {
	return (
		<div className={style.titlesDiv}>
			<h1>What carbs are you eating?</h1>
			<h2>Add their quantity in grams</h2>
		</div>
	);
};

const DropDown = ({ options, onSelect = () => {} }) => {
	const dispatch = useDispatch();

	//Sends carb option to Redux
	const handleOptionClick = (carbObject) => {
		dispatch(carbAdd(carbObject)); //Sends carb
		onSelect(); //Resets SearchBar
	};

	return (
		<div>
			{options.map((carbObject, index) => {
				return (
					<p
						key={index}
						className={style.carbP}
						onClick={() => {
							handleOptionClick(carbObject);
						}}
					>
						{carbObject.carb}
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
	const navigate = useNavigate();

	//Event prop callback when a option is selected
	const resetSearchBar = () => {
		setInputText("");
		setDebouncedText("");
		setCarbsOptions([]);
	};

	const handleInputChange = (e) => {
		setInputText(e.target.value);
	};

	//Set focus to true for placeholder
	const handleFocus = () => {
		setFocused(true);
	};

	//Set focus to false for placeholder
	const handleBlur = () => {
		setFocused(false);
	};

	//Set debounced text value to input text value every 300ms
	useEffect(() => {
		const handler = setTimeout(() => {
			setDebouncedText(inputText);
		}, 300);

		return () => {
			clearTimeout(handler);
		};
	}, [inputText]);

	//Use debounced text value to fetch matching db carbs and store them in carbsOptions (that will be sent to DropDown options prop)
	useEffect(() => {
		if (debouncedText === "") {
			setCarbsOptions([]);
			return; // Exit early if input is empty
		}

		const searchCarbs = async () => {
			try {
				const isTokenValid = checkTokenPresentAndUnexpired();
				if (!isTokenValid) navigate("/login");
				const response = await postAndFetchCarbsOptions(debouncedText);
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
				onChange={handleInputChange}
				className={carbsOptions.length && style.withOptions}
			></input>
			<DropDown options={carbsOptions} onSelect={resetSearchBar} />
		</div>
	);
};

const NewCarbCard = ({ carb, id, carbsGrams, onError = () => {} }) => {
	const dispatch = useDispatch();
	const [localQuantity, setLocalQuantity] = useState(carbsGrams || ""); //Unprocessed carb quantity

	//Set local quantity to input value
	const handleInputChange = (e) => {
		setLocalQuantity(e.target.value);
		if (!isNaN(e.target.value) || e.target.value > 0) onError("");
	};

	//Process local quantity, then dispatch it (or set error)
	const handleInputBlur = () => {
		const quantity = Number(localQuantity.trim());

		if (isNaN(quantity) || quantity <= 0) {
			onError("Please enter a valid number of grams.");
			return;
		}

		const payload = {
			id: id,
			carbsGrams: quantity,
		};
		dispatch(quantityAdd(payload));
	};

	//Remove carb from Redux
	const handleCardDelete = () => {
		dispatch(carbDelete(id));
	};

	return (
		<div className={style.newCarb}>
			<div className={style.cardHeader}>
				<DeleteButton onDelete={handleCardDelete} />
				<p>{carb}</p>
			</div>
			<div className={style.cardContent}>
				<p>Quantity</p>
				<input
					type="number"
					value={localQuantity}
					onChange={handleInputChange}
					onBlur={handleInputBlur}
					onKeyDown={(e) => {
						if (e.key === "." || e.key === ",") {
							e.preventDefault();
						}
					}}
				></input>
				<span>g</span>
			</div>
		</div>
	);
};

const ResultsDiv = ({ cards = [], onError = () => {} }) => {
	return (
		<div className={style.resultsDiv}>
			{cards.map((carbObject) => {
				return (
					<NewCarbCard key={carbObject.id} {...carbObject} onError={onError} />
				);
			})}
		</div>
	);
};

const AddMeal1 = ({ onClickNext = () => {} }) => {
	const navigate = useNavigate();
	const [carbCards, setCarbCards] = useState([]);
	const [errorMessage, setErrorMessage] = useState(null);

	//Stores all the carbs objects from Redux
	const reduxCarbObjects = useSelector((state) => {
		return state.mealData.carbsData;
	});

	//Event prop callback to allow child to set error
	const handleError = (message) => {
		setErrorMessage(message);
	};

	//Handles click event of next button (sets errors or move to next page)
	const handleButtonClick = () => {
		if (!carbCards.length) {
			setErrorMessage("Please select at least one carb.");
			return;
		}

		const hasMissingQuantities = carbCards.some((carbObject) => {
			const quantity = carbObject.carbsGrams;
			return !quantity || isNaN(quantity) || quantity <= 0;
		});

		if (hasMissingQuantities) {
			setErrorMessage("Please enter a valid quantity for all carbs.");
			return;
		}
		onClickNext();
	};

	//If token is expired, navigate to login page
	useEffect(() => {
		const isTokenValid = checkTokenPresentAndUnexpired();
		if (!isTokenValid) navigate("/login");
	}, [navigate]);

	// Whenever reduxCarbObjects changes, update carbCards state
	useEffect(() => {
		setCarbCards(reduxCarbObjects);
	}, [reduxCarbObjects]);

	return (
		<div className={style.contentDiv}>
			<TitlesDiv />
			<SearchBar />
			<ResultsDiv cards={carbCards} onError={handleError} />
			<button className={style.nextButton} onClick={handleButtonClick}>
				Next
			</button>
			{errorMessage && (
				<p className={style.errorMessage}>
					<span>⚠️</span>
					{errorMessage}
				</p>
			)}
		</div>
	);
};

export default AddMeal1;
