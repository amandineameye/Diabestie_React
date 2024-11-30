import style from "./History.module.css";
import MealBCC from "../../components/MealBCC/MealBCC";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getFilteredMeals } from "../../services/history.service.js";
import { checkTokenPresentAndUnexpired } from "../../tools/authTools.js";

const SelectsDiv = ({ onFilterChange = () => {} }) => {
	const handleSelectChange = (e) => {
		onFilterChange(e.target.name, e.target.value);
	};

	return (
		<div className={style.selectsDiv}>
			<select name="unitsTarget" id="unitsTarget" onChange={handleSelectChange}>
				<option value="undefined">Most recent meals</option>
				<option value="tooMany">Too many units</option>
				<option value="right">Right units</option>
				<option value="tooFew">Too few units</option>
			</select>
			<select name="tag" id="tag" onChange={handleSelectChange}>
				<option value="undefined">All tags</option>
				<option value="firstMeal">First meals</option>
				<option value="snack">Snacks</option>
				<option value="wasActive">Around physical activity</option>
			</select>
			<select name="gramsTarget" id="gramsTarget" onChange={handleSelectChange}>
				<option value="undefined">All grams intervals</option>
				<option value="0-30">0 - 30 grams</option>
				<option value="31-60">31 - 60 grams</option>
				<option value="61-90">61 - 90 grams</option>
				<option value="moreThan91">More than 91 grams</option>
			</select>
		</div>
	);
};

const MealsDiv = ({
	page = 1,
	unitsTarget = undefined,
	gramsTarget = undefined,
	tag = undefined,
	onSetPageMax = () => {},
}) => {
	const [meals, setMeals] = useState([]);

	useEffect(() => {
		const fetchMeals = async () => {
			try {
				const isTokenValid = checkTokenPresentAndUnexpired();
				if (!isTokenValid) navigate("/login");
				const data = await getFilteredMeals({
					page,
					unitsTarget,
					gramsTarget,
					tag,
				});
				console.log("Fetched meals: ", data.meals);
				console.log("Meals count: ", data.count);
				setMeals(data.meals);
				const lastPage = Math.ceil(parseInt(data.count) / 6);
				console.log("Last page: ", lastPage);
				onSetPageMax(lastPage);
			} catch (error) {
				console.log(error);
			}
		};
		fetchMeals();
	}, [page, unitsTarget, gramsTarget, tag]);

	return (
		<div className={style.mealsDiv}>
			{meals &&
				meals.map((meal, index) => {
					return (
						<MealBCC
							key={meal.id}
							{...meal}
							className={`style.row${index + 1}`}
						/>
					);
				})}
		</div>
	);
};

const History = () => {
	const navigate = useNavigate();
	const [page, setPage] = useState(1);
	const [pageMax, setPageMax] = useState(1);
	const [filtersObject, setFiltersObject] = useState({
		tag: undefined,
		unitsTarget: undefined,
		gramsTarget: undefined,
	});

	const getPageMax = (page) => {
		setPageMax(page);
	};

	const handleFilter = (filter, value) => {
		const isTokenValid = checkTokenPresentAndUnexpired();
		if (!isTokenValid) navigate("/login");
		setFiltersObject((prevObject) => {
			return { ...prevObject, [filter]: value };
		});
	};

	const handleNextClick = () => {
		setPage((prevPage) => {
			if (prevPage === pageMax) return prevPage;
			return prevPage + 1;
		});
	};

	const handlePreviousClick = () => {
		setPage((prevPage) => {
			if (prevPage === 1) return 1;
			return prevPage - 1;
		});
	};

	useEffect(() => {
		const isTokenValid = checkTokenPresentAndUnexpired();
		if (!isTokenValid) navigate("/login");
	}, [navigate]);
	return (
		<main className="connectedMain">
			<div className={style.mainContentDiv}>
				<h1>History of meals</h1>
				<div className={style.filtersDiv}>
					<SelectsDiv onFilterChange={handleFilter} />
				</div>
				<MealsDiv
					page={page}
					tag={filtersObject.tag}
					unitsTarget={filtersObject.unitsTarget}
					gramsTarget={filtersObject.gramsTarget}
					onSetPageMax={getPageMax}
				/>
				<div className={style.buttonsDiv}>
					<button onClick={handlePreviousClick}>Previous</button>
					<button onClick={handleNextClick}>Next</button>
				</div>
			</div>
		</main>
	);
};

export default History;
