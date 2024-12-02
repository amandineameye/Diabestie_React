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
import { Select } from "antd";
import clsx from "clsx";
import warning from "../../assets/warning.png";

const TitlesDiv = () => {
	return (
		<div className={style.titlesDiv}>
			<h1>What carbs are you eating?</h1>
			<h2>Add their quantity in grams</h2>
		</div>
	);
};

const SearchBar = () => {
	const [inputText, setInputText] = useState("");
	const [debouncedText, setDebouncedText] = useState("");
	const [carbsOptions, setCarbsOptions] = useState([]);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	//When we select something
	const handleSelection = (value) => {
		const selectedObject = carbsOptions.find((object) => {
			return object.carb === value;
		});
		if (selectedObject) {
			dispatch(carbAdd(selectedObject));
			setInputText("");
			setCarbsOptions([]);
		}
	};

	// Debounce input changes
	useEffect(() => {
		const debouncer = setTimeout(() => {
			setDebouncedText(inputText);
		}, 300);
		return () => clearTimeout(debouncer);
	}, [inputText]);

	// Fetch options based on debounced input
	useEffect(() => {
		if (!debouncedText) {
			setCarbsOptions([]);
			return;
		}

		const fetchCarbs = async () => {
			try {
				if (!checkTokenPresentAndUnexpired()) {
					navigate("/login");
					return;
				}
				const response = await postAndFetchCarbsOptions(debouncedText);
				console.log(response.data.matchingCarbs);
				setCarbsOptions(response.data.matchingCarbs);
			} catch (error) {
				console.error(error);
			}
		};

		fetchCarbs();
	}, [debouncedText, navigate]);

	return (
		<Select
			className={style.newSelect}
			showSearch
			allowClear
			searchValue={inputText}
			value={null}
			placeholder="Type and select a carb"
			optionFilterProp="label"
			onChange={handleSelection}
			onSearch={setInputText}
			filterOption={false}
			notFoundContent="No carb matching text"
			options={carbsOptions.map((carbsObject) => {
				return { value: carbsObject.carb, label: carbsObject.carb };
			})}
		/>
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

const ResultsDiv = ({
	cards = [],
	className = "style.resultsDiv",
	onError = () => {},
}) => {
	return (
		<div className={className}>
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

	const contentDivClassName = clsx(
		style.contentDiv,
		carbCards.length === 0 && style.contentDivWithoutCards
	);

	const resultsDivClassName = clsx(
		style.resultsDiv,
		carbCards.length === 1 && style.resultsDivSingle,
		carbCards.length === 2 && style.resultsDivDouble
	);

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
		if (reduxCarbObjects.length === 0) setErrorMessage("");
	}, [reduxCarbObjects]);

	return (
		<div className={contentDivClassName}>
			<TitlesDiv />
			<SearchBar />
			<ResultsDiv
				cards={carbCards}
				className={resultsDivClassName}
				onError={handleError}
			/>
			<button className={style.nextButton} onClick={handleButtonClick}>
				Next
			</button>
			{errorMessage && (
				<p className={style.errorMessage}>
					<img src={warning} alt="warning" />
					{errorMessage}
				</p>
			)}
		</div>
	);
};

export default AddMeal1;
